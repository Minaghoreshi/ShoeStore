export const loginHtmlPage = `<div class="container flex flex-col justify-center items-center px-6">
<div class="back-botton h-14 items-center flex justify-start w-full">
  <i class="fa-solid fa-arrow-left"></i>
</div>
<div class="logo mt-32">
  <img src="../logo/blackLogo.png" alt="logo-image" />
</div>
<div class="pt-28">
  <span class="text-3xl font-semibold">Login to Your Account</span>
</div>
<form action="" class="flex flex-col gap-5 pt-12 w-full">
  <div class="flex gap-2 bg-gray-50 rounded-lg pl-3 items-center py-2">
    <i class="fa-solid fa-envelope"></i>
    <input
      class="bg-transparent w-[80%] focus:outline-none"
      type="email"
      placeholder="Email"
      name="email"
      required
    />
  </div>
  <div class="flex gap-2 bg-gray-50 rounded-lg pl-3 items-center py-2">
    <i class="fa-solid fa-lock"></i>
    <input
      class="bg-transparent w-[80%] focus:outline-none"
      type="password"
      placeholder="Password"
      name="password"
      required
    />
    <i class="fa-solid fa-eye-slash"></i>
  </div>
  <div class="flex gap-2 justify-center mt-5">
    <input type="checkbox" name="Remember" />
    <span>Remember Me</span>
  </div>
  <div class="px-6">
    <button class="nextBtn sign-in bg-gray-400">Sing in</button>
  </div>
</form>
</div>`;
