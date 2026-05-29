import { Skeleton } from "@mui/material";

export const Loading = ()=> {
    return (
        <>
            {Array(4).fill(true).map((_, i)=> 
                <Skeleton 
                    key={`project-skeleton-${i}`}
                    width={192}
                    height={92}
                />
            )}
        </>
    )
}