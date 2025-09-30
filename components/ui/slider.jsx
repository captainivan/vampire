"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  onValueChange,
  bgImage,
  rotNum,
  min = 0,
  max = 100,
  ...props
}) {
  // decide if we have multiple thumbs (range) or single thumb
  const _values = React.useMemo(() => {
    if (Array.isArray(value)) return value
    if (Array.isArray(defaultValue)) return defaultValue
    return [min] // fallback to single thumb
  }, [value, defaultValue, min])

  const isControlled = value !== undefined

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={isControlled ? undefined : defaultValue}
      value={isControlled ? value : undefined}
      onValueChange={onValueChange}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>

      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          aria-label={`Thumb ${index + 1}`}
          style={{
            backgroundImage: bgImage ? `url(${bgImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          className={cn(
            `border-primary rotate-180 bg-no-repeat block w-16 h-16 shrink-0 rounded-full border shadow-sm ring-ring/50 hover:ring-4 focus-visible:ring-4 focus:outline-none disabled:pointer-events-none disabled:opacity-50`
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
