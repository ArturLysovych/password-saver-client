export default function Home() {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <form className="h-auto bg-white border-1 flex flex-col items-center justify-between gap-3 p-8 border rounded-xl">
        <h2 className="text-center text-lg">Create account</h2>
        <input type="text" placeholder="Login" className="w-full outline-none border p-2 pl-3 rounded-md" />
        <input type="password" placeholder="Password" className="w-full outline-none border p-2 pl-3 rounded-md" />
        <input type="email" placeholder="Email" className="w-full outline-none border p-2 pl-3 rounded-md" />
        <button className="w-full p-2 border rounded-md">Sign up</button>
        <p className="text-sm mt-6">Have already an account? <span className="underline cursor-pointer">Login here</span></p>
      </form>
    </main>
  )
}
