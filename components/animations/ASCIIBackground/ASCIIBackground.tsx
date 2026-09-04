"use client";

import { useEffect, useRef } from "react";
import type { CanvasHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./ASCIIBackground.module.scss";

const MAX_DPR = 2;

const VERTEX_SHADER_SOURCE = `#version 300 es
const vec2 POSITIONS[3] = vec2[3](
  vec2(-1.0, -1.0),
  vec2(3.0, -1.0),
  vec2(-1.0, 3.0)
);

void main() {
  gl_Position = vec4(POSITIONS[gl_VertexID], 0.0, 1.0);
}
`;

// Buffer A port of "Creation by Silexars" by Danilo Guanabara.
const BUFFER_A_FRAGMENT_SHADER_SOURCE = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;

out vec4 outColor;

#define TWOPI 6.28318530718

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 10.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = vec3(1.0) - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(
    permute(
      permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0)
    ) + i.x + vec4(0.0, i1.x, i2.x, 1.0)
  );

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = vec4(1.0) - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(
    vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3))
  );
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(
    0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)),
    0.0
  );
  m = m * m;

  return 105.0 * dot(
    m * m,
    vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3))
  );
}

void main() {
  vec3 color;
  float radius;
  float phase = uTime;
  vec2 uv0 = gl_FragCoord.xy / uResolution;

  float noiseStrength = 0.16;
  float noiseScale = 0.001;
  float noiseTime = uTime * 0.1;
  float noise = snoise(vec3(
    (gl_FragCoord.x - uResolution.x / 2.0) * noiseScale,
    (gl_FragCoord.y - uResolution.y / 2.0) * noiseScale,
    noiseTime
  ));

  uv0.x = fract(uv0).x + noiseStrength * sin(noise * TWOPI);
  uv0.y = fract(uv0).y + noiseStrength * cos(noise * TWOPI);

  for (int channel = 0; channel < 3; channel++) {
    vec2 uv;
    vec2 p = uv0;
    uv = p;
    p -= 0.5;
    p.x *= uResolution.x / uResolution.y;
    phase += 0.03;
    radius = length(p);
    uv += p / radius * (sin(phase) + 1.0)
      * abs(sin(radius * 9.0 - phase - phase));
    color[channel] = 0.05 / length(mod(uv, 1.0) - 0.5);
  }

  outColor = vec4(color / radius, uTime);
}
`;

// Image-pass port of movAX13h's bitmap-to-ASCII shader and complete character table.
const ASCII_FRAGMENT_SHADER_SOURCE = `#version 300 es
precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform sampler2D uBufferA;
uniform bool uMonochrome;

out vec4 outColor;

float character(int n, vec2 p) {
  p = floor(p * vec2(-4.0, 4.0) + 2.5);
  if (clamp(p.x, 0.0, 4.0) == p.x) {
    if (clamp(p.y, 0.0, 4.0) == p.y) {
      int a = int(round(p.x) + 5.0 * round(p.y));
      if (((n >> a) & 1) == 1) return 1.0;
    }
  }
  return 0.0;
}

void main() {
  vec2 pix = gl_FragCoord.xy;
  vec3 color = texture(
    uBufferA,
    floor(pix / 16.0) * 16.0 / uResolution
  ).rgb;

  float gray = 0.3 * color.r + 0.59 * color.g + 0.11 * color.b;
  int n = 4096;

  if (gray > 0.0233) n = 4096;
  if (gray > 0.0465) n = 131200;
  if (gray > 0.0698) n = 4329476;
  if (gray > 0.0930) n = 459200;
  if (gray > 0.1163) n = 4591748;
  if (gray > 0.1395) n = 12652620;
  if (gray > 0.1628) n = 14749828;
  if (gray > 0.1860) n = 18393220;
  if (gray > 0.2093) n = 15239300;
  if (gray > 0.2326) n = 17318431;
  if (gray > 0.2558) n = 32641156;
  if (gray > 0.2791) n = 18393412;
  if (gray > 0.3023) n = 18157905;
  if (gray > 0.3256) n = 17463428;
  if (gray > 0.3488) n = 14954572;
  if (gray > 0.3721) n = 13177118;
  if (gray > 0.3953) n = 6566222;
  if (gray > 0.4186) n = 16269839;
  if (gray > 0.4419) n = 18444881;
  if (gray > 0.4651) n = 18400814;
  if (gray > 0.4884) n = 33061392;
  if (gray > 0.5116) n = 15255086;
  if (gray > 0.5349) n = 32045584;
  if (gray > 0.5581) n = 18405034;
  if (gray > 0.5814) n = 15022158;
  if (gray > 0.6047) n = 15018318;
  if (gray > 0.6279) n = 16272942;
  if (gray > 0.6512) n = 18415153;
  if (gray > 0.6744) n = 32641183;
  if (gray > 0.6977) n = 32540207;
  if (gray > 0.7209) n = 18732593;
  if (gray > 0.7442) n = 18667121;
  if (gray > 0.7674) n = 16267326;
  if (gray > 0.7907) n = 32575775;
  if (gray > 0.8140) n = 15022414;
  if (gray > 0.8372) n = 15255537;
  if (gray > 0.8605) n = 32032318;
  if (gray > 0.8837) n = 32045617;
  if (gray > 0.9070) n = 33081316;
  if (gray > 0.9302) n = 32045630;
  if (gray > 0.9535) n = 33061407;
  if (gray > 0.9767) n = 11512810;

  vec2 p = mod(pix / 8.0, 2.0) - vec2(1.0);
  float mask = character(n, p);
  color = uMonochrome ? vec3(mask) : color * mask;

  outColor = vec4(color, 1.0);
}
`;

type ProgramUniforms = {
  program: WebGLProgram;
  resolution: WebGLUniformLocation;
};

type WebGLResources = {
  ascii: ProgramUniforms & {
    bufferA: WebGLUniformLocation;
    monochrome: WebGLUniformLocation;
  };
  bufferA: ProgramUniforms & {
    time: WebGLUniformLocation;
  };
  framebuffer: WebGLFramebuffer;
  texture: WebGLTexture;
  vertexArray: WebGLVertexArrayObject;
};

export type ASCIIBackgroundProps = Omit<
  CanvasHTMLAttributes<HTMLCanvasElement>,
  "children" | "height" | "width"
> & {
  monochrome?: boolean;
};

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

const createProgram = (
  gl: WebGL2RenderingContext,
  fragmentSource: string,
) => {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
  let fragmentShader: WebGLShader | null = null;

  try {
    fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
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
  const bufferAProgram = createProgram(gl, BUFFER_A_FRAGMENT_SHADER_SOURCE);
  let asciiProgram: WebGLProgram | null = null;
  let framebuffer: WebGLFramebuffer | null = null;
  let texture: WebGLTexture | null = null;
  let vertexArray: WebGLVertexArrayObject | null = null;

  try {
    asciiProgram = createProgram(gl, ASCII_FRAGMENT_SHADER_SOURCE);
    framebuffer = gl.createFramebuffer();
    texture = gl.createTexture();
    vertexArray = gl.createVertexArray();

    if (!framebuffer || !texture || !vertexArray) {
      throw new Error("Unable to allocate WebGL resources.");
    }

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0,
    );
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

    gl.useProgram(asciiProgram);
    gl.uniform1i(getUniform(gl, asciiProgram, "uBufferA"), 0);

    return {
      ascii: {
        program: asciiProgram,
        resolution: getUniform(gl, asciiProgram, "uResolution"),
        bufferA: getUniform(gl, asciiProgram, "uBufferA"),
        monochrome: getUniform(gl, asciiProgram, "uMonochrome"),
      },
      bufferA: {
        program: bufferAProgram,
        resolution: getUniform(gl, bufferAProgram, "uResolution"),
        time: getUniform(gl, bufferAProgram, "uTime"),
      },
      framebuffer,
      texture,
      vertexArray,
    };
  } catch (error) {
    gl.deleteProgram(bufferAProgram);
    if (asciiProgram) gl.deleteProgram(asciiProgram);
    if (framebuffer) gl.deleteFramebuffer(framebuffer);
    if (texture) gl.deleteTexture(texture);
    if (vertexArray) gl.deleteVertexArray(vertexArray);
    throw error;
  }
};

const deleteResources = (
  gl: WebGL2RenderingContext,
  resources: WebGLResources,
) => {
  gl.deleteProgram(resources.bufferA.program);
  gl.deleteProgram(resources.ascii.program);
  gl.deleteFramebuffer(resources.framebuffer);
  gl.deleteTexture(resources.texture);
  gl.deleteVertexArray(resources.vertexArray);
};

export const ASCIIBackground = ({
  className,
  monochrome = false,
  ...rest
}: ASCIIBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const monochromeRef = useRef(monochrome);

  useEffect(() => {
    monochromeRef.current = monochrome;
  }, [monochrome]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
      stencil: false,
    });

    if (!gl) {
      console.warn("ASCIIBackground: WebGL2 is unavailable.");
      return;
    }

    let resources: WebGLResources | null = null;
    let animationFrame = 0;
    let drawingWidth = 0;
    let drawingHeight = 0;
    let nextWidth = 1;
    let nextHeight = 1;
    let resizePending = true;
    let elapsedSeconds = 0;
    let lastFrameTime: number | null = null;
    let isAnimating = false;
    let isInViewport = true;
    let disposed = false;

    const stop = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      isAnimating = false;
      lastFrameTime = null;
    };

    const canRender = () =>
      !disposed && !document.hidden && isInViewport && resources !== null;

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (width !== drawingWidth || height !== drawingHeight) {
        nextWidth = width;
        nextHeight = height;
        resizePending = true;
      }
    };

    const resize = () => {
      if (!resources || !resizePending) return;

      canvas.width = nextWidth;
      canvas.height = nextHeight;
      drawingWidth = nextWidth;
      drawingHeight = nextHeight;

      gl.bindTexture(gl.TEXTURE_2D, resources.texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA8,
        drawingWidth,
        drawingHeight,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null,
      );

      gl.bindFramebuffer(gl.FRAMEBUFFER, resources.framebuffer);
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.bindTexture(gl.TEXTURE_2D, null);

      if (status !== gl.FRAMEBUFFER_COMPLETE) {
        throw new Error(`Incomplete Buffer A framebuffer: ${status}`);
      }

      resizePending = false;
    };

    const render = (now: number) => {
      if (!canRender() || !resources) {
        stop();
        return;
      }

      if (lastFrameTime !== null) {
        elapsedSeconds += Math.min((now - lastFrameTime) / 1000, 0.1);
      }
      lastFrameTime = now;

      try {
        resize();

        gl.bindVertexArray(resources.vertexArray);

        gl.bindFramebuffer(gl.FRAMEBUFFER, resources.framebuffer);
        gl.viewport(0, 0, drawingWidth, drawingHeight);
        gl.useProgram(resources.bufferA.program);
        gl.uniform2f(
          resources.bufferA.resolution,
          drawingWidth,
          drawingHeight,
        );
        gl.uniform1f(resources.bufferA.time, elapsedSeconds);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, drawingWidth, drawingHeight);
        gl.useProgram(resources.ascii.program);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, resources.texture);
        gl.uniform2f(resources.ascii.resolution, drawingWidth, drawingHeight);
        gl.uniform1i(
          resources.ascii.monochrome,
          monochromeRef.current ? 1 : 0,
        );
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        gl.bindVertexArray(null);
        gl.bindTexture(gl.TEXTURE_2D, null);
      } catch (error) {
        console.error("ASCIIBackground: rendering failed.", error);
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

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

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
        start();
      } catch (error) {
        console.error("ASCIIBackground: WebGL restoration failed.", error);
      }
    };

    const resizeObserver = new ResizeObserver(() => measure());
    const intersectionObserver = new IntersectionObserver((entries) => {
      isInViewport = entries[0]?.isIntersecting ?? true;
      if (isInViewport) start();
      else stop();
    });

    try {
      resources = createResources(gl);
      measure();
      resizeObserver.observe(canvas.parentElement ?? canvas);
      intersectionObserver.observe(canvas);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      canvas.addEventListener("webglcontextlost", handleContextLost);
      canvas.addEventListener("webglcontextrestored", handleContextRestored);
      start();
    } catch (error) {
      console.error("ASCIIBackground: WebGL initialization failed.", error);
    }

    return () => {
      disposed = true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);

      if (resources && !gl.isContextLost()) {
        deleteResources(gl, resources);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      {...rest}
      aria-hidden="true"
      className={cn(styles.canvas, className)}
    />
  );
};
