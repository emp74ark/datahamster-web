export default function Loading() {
  return (
    <div className="fixed w-screen h-screen inset-0 bg-neutral-800/80 flex justify-center items-center backdrop-blur-xs">
      <div className="rounded-full w-10 h-10 border-t-4 border-r-4 border-amber-800 animate-spin"></div>
    </div>
  );
}
