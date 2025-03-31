"use client"

import { Mail, Lock, BookOpen, ChevronRight } from "lucide-react"

function Login(props: any) {
  const { handleSubmit, onSubmit, register, errors } = props

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111827] bg-gradient-to-br from-[#111827] to-[#1a1f35] p-4">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-[60%] right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-3 rounded-xl shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <span className="ml-3 text-3xl font-bold text-white">EduMaster</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1e2235]/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-[#2a2f45] relative">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-purple-500/20 to-transparent rounded-bl-full"></div>

          <div className="p-8 relative z-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="text-gray-400 mt-2">Sign in to continue your learning journey</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#2a2f45] focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 bg-[#252a3e] text-white placeholder-gray-500"
                      placeholder="Enter your email"
                      {...register("email", { required: true })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300 block">Password</label>
                    <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                    </div>
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#2a2f45] focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 bg-[#252a3e] text-white placeholder-gray-500"
                      placeholder="Enter your password"
                      {...register("password", { required: true })}
                    />
                  </div>
                </div>

                {errors && <div className="text-red-400 text-sm text-center">{errors}</div>}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0 shadow-lg hover:shadow-purple-600/30 flex items-center justify-center"
                >
                  <span>Sign In</span>
                  <ChevronRight className="ml-2 h-5 w-5 animate-pulse-subtle" />
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300 transition-colors"
                >
                  Sign Up Free
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

