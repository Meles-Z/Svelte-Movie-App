
<script>
    import Footer from "$lib/components/Footer.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import "../app.css";
  </script>

<main class="relative text-white bg-black min-h-screen">
  <Navbar/>
  <div class="absolute top-20 w-full bg-black">
    <slot/>
  </div>
  <!-- <Footer/> -->
</main>