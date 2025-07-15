import type { LoaderProps } from "../../../types/post.types";

export default function LoaderContainerHeight({ text = "Loading..." }: LoaderProps) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-buzzin-orange-logo border-opacity-50 mb-4"></div>
        <p className="text-lg font-Montserrat-VariableFont text-gray-700">{text}</p>
      </div>
    </div>
  );
}