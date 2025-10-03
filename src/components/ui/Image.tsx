import { ImgHTMLAttributes, useState } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
}

export default function Image({
  src,
  alt,
  fill,
  priority,
  className,
  ...props
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full ${className || ''}`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoading(false)}
        style={{
          objectFit: 'cover',
          transition: 'opacity 0.3s ease-in-out',
          opacity: isLoading ? 0 : 1,
        }}
        {...props}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      onLoad={() => setIsLoading(false)}
      style={{
        transition: 'opacity 0.3s ease-in-out',
        opacity: isLoading ? 0 : 1,
      }}
      {...props}
    />
  );
}
