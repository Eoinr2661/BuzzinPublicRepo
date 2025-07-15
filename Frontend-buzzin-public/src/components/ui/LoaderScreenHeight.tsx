import type { LoaderProps } from "../../../types/post.types";

export default function LoaderScreenHeight({ text = "Loading..." }: LoaderProps) {
  return (
    <main className="min-h-screen flex w-full items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-buzzin-orange-logo border-opacity-50 mb-4"></div>
        <p className="text-lg font-Montserrat-VariableFont text-gray-700">{text}</p>
      </div>
    </main>
  );
}