<template>
    <Header />
    <div class="content">
        <main>
            <section>
                <div class="article-top">
                    <div class="article-icon">
                        <i class="fa-brands fa-css3-alt"></i>
                    </div>
                    <div class="article-text">
                        <div class="article-title">CSS</div>
                    </div>
                </div>
            </section>

            <section data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="150"
                data-aos-duration="1000">
                <a href="CSS_has-and-not" class="article">
                    <div class="article-icon">
                        <i class="fa-brands fa-css3-alt"></i>
                    </div>
                    <div class="article-text">
                        <div class="article-title">:has() 和 :not() 偽類選擇器</div>
                        <div class="article-tag"><i class="fa-solid fa-tag"></i>CSS<i class="fa-sharp fa-solid fa-calendar-days"></i>2024-01-28</div>
                        <div class="article-underline"></div>
                        <div class="article-content">
                            <p>在 CSS 中，:has() 和 :not() 是兩個重要的偽類選取器，可以用來根據元素的子元素或不符合某些條件的元素來進行樣式設定。</p>
                        </div>
                    </div>
                </a>
            </section>

            <section data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="150"
                data-aos-duration="1000">
                <a href="CSS_nth-child" class="article">
                    <div class="article-icon">
                        <i class="fa-brands fa-css3-alt"></i>
                    </div>
                    <div class="article-text">
                        <div class="article-title">CSS 選取第一個、最後一個、偶數、奇數、第n個標簽元素</div>
                        <div class="article-tag"><i class="fa-solid fa-tag"></i>CSS<i
                                class="fa-sharp fa-solid fa-calendar-days"></i>2023-07-17</div>
                        <div class="article-underline"></div>
                        <div class="article-content">
                            <p>CSS3
                                新增的選取器中，大概就屬:nth-child(n)功能最猛了，:nth-child(n)不僅可以不靠class或是ID來選取網頁項目外，還解決了網頁中清單資料規律性選取的問題，:nth-child(n)尤其對於表格資料的呈現上，真的是方便太多了
                            </p>
                        </div>
                    </div>
                </a>
            </section>

            <section data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="150"
                data-aos-duration="1000">
                <a href="CSS_box-sizing" class="article">
                    <div class="article-icon">
                        <i class="fa-brands fa-css3-alt"></i>
                    </div>
                    <div class="article-text">
                        <div class="article-title">什麼是 CSS box-sizing？</div>
                        <div class="article-tag"><i class="fa-solid fa-tag"></i>CSS<i
                                class="fa-sharp fa-solid fa-calendar-days"></i>2023-07-12</div>
                        <div class="article-underline"></div>
                        <div class="article-content">
                            <p>CSS 的 box-sizing
                                是一個屬性，用於控制元素的寬度和高度的計算方式。它決定了指定的寬度和高度是否包括元素的邊距(margin)、內邊距(padding)和邊框(border)。</p>
                            <p>box-sizing 屬性可以有兩個值：content-box (默認值)、border-box</p>
                        </div>
                    </div>
                </a>
            </section>

            <section data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="150"
                data-aos-duration="1000">
                <a href="Code_Limit-Line-Width" class="article">
                    <div class="article-icon">
                        <i class="fa-solid fa-file-code"></i>
                    </div>
                    <div class="article-text">
                        <div class="article-title">限制內容字數寬度或行數</div>
                        <div class="article-tag"><i class="fa-solid fa-tag"></i>CSS<i
                                class="fa-solid fa-tag"></i>JavaScript<i
                                class="fa-sharp fa-solid fa-calendar-days"></i>2023-07-05</div>
                        <div class="article-underline"></div>
                        <div class="article-content">
                            <p>限制內容字數寬度或行數，超過顯示刪節號…</p>
                            <p>透過 CSS 來限制字數寬度或行數做法，可以將長篇的文章進行截斷，並且結尾以...方式呈現在版面上，對排版來說是相當好用的方式。</p>
                            <p>但display: -webkit-box;語法在某些瀏覽器不支援，所以建議使用JavaScript寫法。</p>
                        </div>
                    </div>
                </a>
            </section>
        </main>
        <Wall />
    </div>
    <pageRate />
    <BackToTop />
</template>

<script setup>
import Header from "@/components/Header.vue";
import Wall from "@/components/Wall.vue";
import BackToTop from "@/components/BackToTop.vue";
import pageRate from "@/components/pageRate.vue";
</script>