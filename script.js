const API_KEY = "k0/H5fUGA+xZKtZ/1yi0Ag==S9QbwsLqyUZqLjv2";
const URL = "https://api.api-ninjas.com/v1/cars?model=corolla";

const input = document.getElementById("aramainputu");
const button = document.getElementById("listelemebutonu");
const filtre = document.getElementById("filtresecme");
const kartAlanı = document.querySelector(".arackartları");
const bilgi = document.getElementById("bilgiendirmeekranı");

const panel = document.querySelector(".detaypaneli");
const baslik = document.getElementById("modeladı");

const detay1 = document.getElementById("detay1");
const detay2 = document.getElementById("detay2");
const detay3 = document.getElementById("detay3");
const detay4 = document.getElementById("detay4");
const detay5 = document.getElementById("detay5");
const detay6 = document.getElementById("detay6");

button.addEventListener("click", arabaGetir);

async function arabaGetir() {
  kartAlanı.innerHTML = "";
  bilgi.textContent = " Veriler yükleniyor  ...";

  if (input.value.trim() === "" || /^\d+$/.test(input.value)) {
    bilgi.textContent = " Lütfen marka veya model giriniz";
    return;
  }

  try {
    const cevap = await fetch(URL, {
      headers: { "X-Api-Key": API_KEY },
    });

    let data = await cevap.json();

    if (filtre.value !== "") {
      data = data.filter((a) => a.fuel_type === filtre.value);
    }

    if (data.length === 0) {
      bilgi.textContent = " Sonuç bulunamadı";
      return;
    }

    bilgi.textContent = " araclar listelendi";
    kartBas(data);
  } catch (e) {
    bilgi.textContent = " Veri alınamadı";
  }
}

function kartBas(arabalar) {
  arabalar.forEach((arac) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
    <h3>${arac.make} ${arac.model}</h3>
    <p>Yıl: ${arac.year || "-"}</p>
    <p>Yakıt: ${arac.fuel_type || "-"}</p>
    <button>Detay</button>
    `;

    div.querySelector("button").onclick = () => detayAc(arac);
    kartAlanı.appendChild(div);
  });
}

function detayAc(arac) {
  baslik.textContent = `${arac.make} ${arac.model}`;

  detay1.textContent = "Silindir: " + (arac.cylinders || "-");
  detay2.textContent = "Motor Hacmi: " + (arac.displacement || "-");
  detay3.textContent = "Çekiş: " + (arac.drive || "-");
  detay4.textContent = "Marka: " + (arac.make || "-");
  detay5.textContent = "Model: " + (arac.model || "-");
  detay6.textContent = "Araç Sınıfı: " + (arac.class || "-");

  panel.style.display = "block";
}

function detaykapatma() {
  panel.style.display = "none";
}
const modeBtn = document.getElementById("darkmode");

modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    modeBtn.textContent = " Light Mode";
  } else {
    modeBtn.textContent = " Dark Mode";
  }
});
