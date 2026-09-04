"use client";

import cn from "classnames";
import { useEffect, useRef } from "react";
import styles from "./PixelizedVideoBackground.module.scss";

const MAX_DPR = 2;
const PIXEL_SIZE = 8;
const REVERSE_FPS = 24;
const REVERSE_STEP = 1 / REVERSE_FPS;
const REVERSE_SEEK_INTERVAL = REVERSE_STEP;
const VIDEO_END_EPSILON = 0.001;

const VERTEX_SHADER_SOURCE = `#version 300 es
const vec2 POSITIONS[4] = vec2[4](
  vec2(-1.0, -1.0),
  vec2(1.0, -1.0),
  vec2(-1.0, 1.0),
  vec2(1.0, 1.0)
);

void main() {
  gl_Position = vec4(POSITIONS[gl_VertexID], 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform vec2 uVideoResolution;
uniform vec2 uPixelSize;
uniform sampler2D uVideoTexture;

out vec4 outColor;

vec2 coverUV(vec2 uv) {
  float outputAspect = uResolution.x / uResolution.y;
  float videoAspect = uVideoResolution.x / uVideoResolution.y;

  if (outputAspect > videoAspect) {
    uv.y = (uv.y - 0.5) * (videoAspect / outputAspect) + 0.5;
  } else {
    uv.x = (uv.x - 0.5) * (outputAspect / videoAspect) + 0.5;
  }

  return uv;
}

float luminosity(vec3 color) {
  return color.r * 0.21 + color.g * 0.72 + color.b * 0.07;
}

void main() {
  vec2 downscaledCoord = floor(gl_FragCoord.xy / uPixelSize) * uPixelSize;
  vec2 uv = coverUV(downscaledCoord / uResolution);
  vec3 color = texture(uVideoTexture, uv).rgb;
  float gray = luminosity(color);

  outColor = vec4(vec3(gray), 1.0);
}
`;

type WebGLResources = {
  program: WebGLProgram;
  texture: WebGLTexture;
  vertexArray: WebGLVertexArrayObject;
  resolution: WebGLUniformLocation;
  videoResolution: WebGLUniformLocation;
  pixelSize: WebGLUniformLocation;
};

export interface VideoShaderBackgroundProps {
  videoSrc?: string;
  reverse?: boolean;
  className?: string;
}

const compileShader = (
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
) => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create a WebGL shader.");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "Unknown shader error.";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
};

const createProgram = (gl: WebGL2RenderingContext) => {
  const vertexShader = compileShader(
    gl,
    gl.VERTEX_SHADER,
    VERTEX_SHADER_SOURCE,
  );
  let fragmentShader: WebGLShader | null = null;

  try {
    fragmentShader = compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADER_SOURCE,
    );
  } catch (error) {
    gl.deleteShader(vertexShader);
    throw error;
  }

  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error("Unable to create a WebGL program.");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? "Unknown program error.";
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
};

const getUniform = (
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  name: string,
) => {
  const uniform = gl.getUniformLocation(program, name);
  if (uniform === null) throw new Error(`Missing WebGL uniform: ${name}`);
  return uniform;
};

const createResources = (gl: WebGL2RenderingContext): WebGLResources => {
  const program = createProgram(gl);
  let texture: WebGLTexture | null = null;
  let vertexArray: WebGLVertexArrayObject | null = null;

  try {
    texture = gl.createTexture();
    vertexArray = gl.createVertexArray();

    if (!texture || !vertexArray) {
      throw new Error("Unable to allocate WebGL resources.");
    }

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 255]),
    );

    gl.useProgram(program);
    gl.uniform1i(getUniform(gl, program, "uVideoTexture"), 0);
    gl.bindTexture(gl.TEXTURE_2D, null);

    return {
      program,
      texture,
      vertexArray,
      resolution: getUniform(gl, program, "uResolution"),
      videoResolution: getUniform(gl, program, "uVideoResolution"),
      pixelSize: getUniform(gl, program, "uPixelSize"),
    };
  } catch (error) {
    gl.deleteProgram(program);
    if (texture) gl.deleteTexture(texture);
    if (vertexArray) gl.deleteVertexArray(vertexArray);
    throw error;
  }
};

const deleteResources = (
  gl: WebGL2RenderingContext,
  resources: WebGLResources,
) => {
  gl.deleteProgram(resources.program);
  gl.deleteTexture(resources.texture);
  gl.deleteVertexArray(resources.vertexArray);
};

export const PixelizedVideoBackground = ({
  videoSrc,
  reverse = false,
  className,
}: VideoShaderBackgroundProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reverseRef = useRef(reverse);
  const syncPlaybackRef = useRef<() => void>(() => undefined);
  const resetTextureRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!root || !canvas || !video) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
      stencil: false,
    });

    if (!gl) {
      console.warn("VideoShaderBackground: WebGL2 is unavailable.");
      return;
    }

    let resources: WebGLResources | null = null;
    let animationFrame = 0;
    let drawingWidth = 0;
    let drawingHeight = 0;
    let drawingDpr = 1;
    let nextWidth = 1;
    let nextHeight = 1;
    let nextDpr = 1;
    let resizePending = true;
    let isAnimating = false;
    let disposed = false;
    let textureUploadFailed = false;
    let wasReversing = reverseRef.current;
    let reverseSeekTarget: number | null = null;
    let resumeForwardAfterSeek = false;
    let reverseSeekElapsed = 0;
    let lastFrameTime: number | null = null;

    const hasVideoSource = () => Boolean(video.getAttribute("src"));

    const resetReverseClock = () => {
      reverseSeekElapsed = 0;
      lastFrameTime = null;
    };

    const stop = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      isAnimating = false;
      resetReverseClock();
    };

    const canRender = () =>
      !disposed &&
      !document.hidden &&
      resources !== null &&
      hasVideoSource();

    const measure = () => {
      const rect = root.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (
        width !== drawingWidth ||
        height !== drawingHeight ||
        dpr !== drawingDpr
      ) {
        nextWidth = width;
        nextHeight = height;
        nextDpr = dpr;
        resizePending = true;
      }
    };

    const resize = () => {
      if (!resizePending) return;

      canvas.width = nextWidth;
      canvas.height = nextHeight;
      drawingWidth = nextWidth;
      drawingHeight = nextHeight;
      drawingDpr = nextDpr;
      resizePending = false;
    };

    const resetTexture = () => {
      textureUploadFailed = false;

      if (!resources || gl.isContextLost()) return;

      gl.bindTexture(gl.TEXTURE_2D, resources.texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 255]),
      );
      gl.bindTexture(gl.TEXTURE_2D, null);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    };

    const requestReverseSeek = (targetTime: number) => {
      if (reverseSeekTarget !== null || video.seeking) return false;

      reverseSeekTarget = targetTime;

      try {
        video.currentTime = targetTime;
        return true;
      } catch {
        reverseSeekTarget = null;
        return false;
      }
    };

    const updateReversePlayback = (now: number) => {
      if (!reverseRef.current) return;

      const duration = video.duration;
      if (
        !Number.isFinite(duration) ||
        duration <= 0 ||
        video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA
      ) {
        return;
      }

      if (reverseSeekTarget !== null) {
        if (video.seeking) return;

        const decodedTarget = reverseSeekTarget;
        const reachedTarget = Math.abs(
          video.currentTime - decodedTarget,
        ) <= REVERSE_STEP;

        if (!reachedTarget) return;
        reverseSeekTarget = null;
      }

      if (lastFrameTime === null) {
        lastFrameTime = now;
        return;
      }

      const delta = Math.min((now - lastFrameTime) / 1000, 0.1);
      lastFrameTime = now;
      reverseSeekElapsed = Math.min(
        reverseSeekElapsed + delta,
        REVERSE_SEEK_INTERVAL,
      );

      if (
        reverseSeekElapsed < REVERSE_SEEK_INTERVAL ||
        reverseSeekTarget !== null ||
        video.seeking
      ) {
        return;
      }

      const currentTime = video.currentTime;
      const nextTime = currentTime <= REVERSE_STEP + VIDEO_END_EPSILON
        ? Math.max(VIDEO_END_EPSILON, duration - VIDEO_END_EPSILON)
        : Math.max(VIDEO_END_EPSILON, currentTime - REVERSE_STEP);

      if (requestReverseSeek(nextTime)) reverseSeekElapsed = 0;
    };

    const uploadVideoFrame = () => {
      if (
        !resources ||
        textureUploadFailed ||
        video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
        video.videoWidth === 0 ||
        video.videoHeight === 0
      ) {
        return;
      }

      try {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, resources.texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          video,
        );
      } catch (error) {
        textureUploadFailed = true;
        console.error(
          "VideoShaderBackground: the video could not be uploaded. Remote videos must allow cross-origin texture access.",
          error,
        );
      }
    };

    const render = (now: number) => {
      if (!canRender() || !resources) {
        stop();
        return;
      }

      try {
        resize();
        updateReversePlayback(now);
        uploadVideoFrame();

        gl.viewport(0, 0, drawingWidth, drawingHeight);
        gl.useProgram(resources.program);
        gl.bindVertexArray(resources.vertexArray);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, resources.texture);
        gl.uniform2f(resources.resolution, drawingWidth, drawingHeight);
        gl.uniform2f(
          resources.videoResolution,
          Math.max(1, video.videoWidth),
          Math.max(1, video.videoHeight),
        );
        gl.uniform2f(
          resources.pixelSize,
          PIXEL_SIZE * drawingDpr,
          PIXEL_SIZE * drawingDpr,
        );
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.bindVertexArray(null);
        gl.bindTexture(gl.TEXTURE_2D, null);
      } catch (error) {
        console.error("VideoShaderBackground: rendering failed.", error);
        stop();
        return;
      }

      animationFrame = requestAnimationFrame(render);
    };

    const start = () => {
      if (isAnimating || !canRender()) return;
      isAnimating = true;
      animationFrame = requestAnimationFrame(render);
    };

    const syncPlayback = () => {
      const isReversing = reverseRef.current;

      if (wasReversing !== isReversing) {
        const hadPendingReverseSeek =
          reverseSeekTarget !== null || video.seeking;

        wasReversing = isReversing;
        resetReverseClock();

        if (isReversing) {
          resumeForwardAfterSeek = false;
        } else {
          reverseSeekTarget = null;
          resumeForwardAfterSeek = hadPendingReverseSeek;
        }
      }

      const shouldRun =
        !disposed && !document.hidden && hasVideoSource();

      if (!shouldRun) {
        video.pause();
        stop();
        return;
      }

      video.loop = !isReversing;

      if (isReversing) {
        video.pause();

        if (
          Number.isFinite(video.duration) &&
          video.duration > 0 &&
          video.currentTime <= VIDEO_END_EPSILON
        ) {
          requestReverseSeek(
            Math.max(
              VIDEO_END_EPSILON,
              video.duration - VIDEO_END_EPSILON,
            ),
          );
        }
      } else if (resumeForwardAfterSeek || video.seeking) {
        resumeForwardAfterSeek = true;
      } else {
        void video.play().catch(() => {
          // The texture stays on the last available frame if autoplay is denied.
        });
      }

      start();
    };

    const handleVideoLoadStart = () => {
      resetTexture();
      resetReverseClock();
      reverseSeekTarget = null;
      resumeForwardAfterSeek = false;
    };

    const handleVideoReady = () => {
      if (
        reverseRef.current &&
        Number.isFinite(video.duration) &&
        video.duration > 0 &&
        video.currentTime <= VIDEO_END_EPSILON
      ) {
        requestReverseSeek(
          Math.max(
            VIDEO_END_EPSILON,
            video.duration - VIDEO_END_EPSILON,
          ),
        );
      }

      syncPlayback();
    };

    const handleSeeked = () => {
      reverseSeekTarget = null;

      if (!reverseRef.current && resumeForwardAfterSeek) {
        resumeForwardAfterSeek = false;
        syncPlayback();
      }
    };

    const handleVisibilityChange = () => syncPlayback();

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      stop();
      resources = null;
    };

    const handleContextRestored = () => {
      if (disposed) return;

      try {
        resources = createResources(gl);
        resizePending = true;
        textureUploadFailed = false;
        syncPlayback();
      } catch (error) {
        console.error(
          "VideoShaderBackground: WebGL restoration failed.",
          error,
        );
      }
    };

    const resizeObserver = new ResizeObserver(measure);

    try {
      resources = createResources(gl);
      measure();
      resetTexture();
      resizeObserver.observe(root);
      window.addEventListener("resize", measure, { passive: true });
      document.addEventListener("visibilitychange", handleVisibilityChange);
      video.addEventListener("loadstart", handleVideoLoadStart);
      video.addEventListener("loadedmetadata", handleVideoReady);
      video.addEventListener("canplay", handleVideoReady);
      video.addEventListener("seeked", handleSeeked);
      canvas.addEventListener("webglcontextlost", handleContextLost);
      canvas.addEventListener("webglcontextrestored", handleContextRestored);
      syncPlaybackRef.current = syncPlayback;
      resetTextureRef.current = resetTexture;
      syncPlayback();
    } catch (error) {
      console.error(
        "VideoShaderBackground: WebGL initialization failed.",
        error,
      );
    }

    return () => {
      disposed = true;
      video.pause();
      stop();
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.removeEventListener("loadstart", handleVideoLoadStart);
      video.removeEventListener("loadedmetadata", handleVideoReady);
      video.removeEventListener("canplay", handleVideoReady);
      video.removeEventListener("seeked", handleSeeked);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      syncPlaybackRef.current = () => undefined;
      resetTextureRef.current = () => undefined;

      if (resources && !gl.isContextLost()) {
        deleteResources(gl, resources);
      }
    };
  }, []);

  useEffect(() => {
    reverseRef.current = reverse;
    syncPlaybackRef.current();
  }, [reverse]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.removeAttribute("src");
    resetTextureRef.current();

    if (videoSrc) video.src = videoSrc;

    video.load();
    syncPlaybackRef.current();
  }, [videoSrc]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn(styles.root, className)}
    >
      <canvas ref={canvasRef} className={styles.canvas} />
      <video
        ref={videoRef}
        className={styles.video}
        aria-hidden="true"
        autoPlay={!reverse}
        controls={false}
        crossOrigin="anonymous"
        disablePictureInPicture
        disableRemotePlayback
        loop={!reverse}
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      />
    </div>
  );
};
