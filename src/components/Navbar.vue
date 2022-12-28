<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">PLANTS</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#">歷史紀錄</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>
<script>


</script>
<style lang="scss" scoped>
    @import '../assets/scss/colors.scss';

    .navbar {
        background-color: $lightGreen;
        margin-bottom: 30px;
    }

    /* 要將這三個css都修改樣式才會有變化 */
    .navbar-light .navbar-nav .nav-link {
        color: $white;
    }

    .navbar-brand {
        color: $white;
    }

    .navbar-brand:hover {
        color: $darkGreen;
        transition: 0.3s;
    }

    .nav-link {
        font-weight: normal;
    }

    .nav-link:hover {
        text-decoration: underline;
        text-underline-offset: 2.5px;
    }
</style>