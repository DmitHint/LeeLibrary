document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".mobile-menu li");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.forEach(function (navLink) {
                navLink.classList.remove("active");
            });
            this.classList.add("active");
            localStorage.setItem("activeNavLink", this.href);
        });
    });

    const activeNavLink = localStorage.getItem("activeNavLink");

    if (activeNavLink) {
        navLinks.forEach(function (link) {
            if (link.href === activeNavLink) {
                link.classList.add("active");
            }
        });
    }
});
