const total = 31;
let index = 0;
let i=1

const mainImage = document.getElementById("mainImage");
const thumbsContainer = document.getElementById("thumbs");

// 👉 gerar thumbs automaticamente
for (let i = 1; i <= total; i++) {
  const img = document.createElement("img");
  img.src = `./imagens/img (${i}).webp`;
  img.loading = "lazy";
  img.addEventListener("click", () => {
    index = i - 1;
    updateGallery();
  });

  thumbsContainer.appendChild(img);
}

const thumbs = thumbsContainer.querySelectorAll("img");

// 👉 atualizar galeria
function updateGallery() {
 mainImage.src = `./imagens/img (${index + 1}).webp`;

  thumbs.forEach(t => t.classList.remove("active"));
  thumbs[index].classList.add("active");

  // 🔥 scroll acompanha
  thumbs[index].scrollIntoView({
    behavior: "smooth",
    inline: "center"
  });
}

// 👉 botões
document.querySelector(".next").onclick = () => {
  index = (index + 1) % total;
  updateGallery();
};

document.querySelector(".prev").onclick = () => {
  index = (index - 1 + total) % total;
  updateGallery();
};

updateGallery();


// 👉 SWIPE (mobile)
let startX = 0;

mainImage.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

mainImage.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    index = (index + 1) % total;
  } else if (endX - startX > 50) {
    index = (index - 1 + total) % total;
  }

  updateGallery();
});

mainImage.addEventListener("click", () => {
  mainImage.classList.toggle("zoom");
});

setInterval(() => {
  index = (index + 1) % total;
  updateGallery();
}, 4000);

