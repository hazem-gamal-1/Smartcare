import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  src: string;
};

export function ImageWithFallback({
  src,
  alt,
  className,
  style,
  ...rest
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      fill
    />
  );
}
