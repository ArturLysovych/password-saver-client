import Link from "next/link"

export default function RegForm() {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-red-400">
            <form className="h-auto max-w-sm bg-white border-2 flex flex-col items-center justify-between gap-3 p-8 rounded-xl">
              <h2 className="text-center text-lg">Create account</h2>
              <input type="text" placeholder="Login" className="register-input" />
              <input type="password" placeholder="Password" className="register-input" />
              <input type="email" placeholder="Email" className="register-input" />
              <button className="w-full p-2 border-2 rounded-md">Sign up</button>
              <p className="text-sm mt-6">Have already an account?
                <Link href="/login">
                  <span className="underline cursor-pointer ml-1">Login here</span>
                </Link>
              </p>
            </form>
        </div>
    )
}
  