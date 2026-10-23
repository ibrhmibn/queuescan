export default function Footer() {
  return (
    <footer className="bg-brutal-black text-brutal-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-center md:flex-row md:px-6 md:text-left">
        <p className="font-heading text-xl uppercase">QueueScan</p>
        <p className="text-sm font-medium">© {new Date().getFullYear()} QueueScan. ibra_dev.</p>
      </div>
    </footer>
  );
}