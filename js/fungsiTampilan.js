const BELUM_SELESAI_DIBACA = "daftarBuku";
const SELESAI_DIBACA = "bukuSelesai"; 
const BUKU_ID = "itemId";

function tambahBuku(){
    const bukuBelumSelesai = document.getElementById(BELUM_SELESAI_DIBACA);

    const judulBuku = document.getElementById("judul").value;
    const penulisBuku = document.getElementById("penulis").value;
    const tahunTerbit = document.getElementById("tahun").value;
    
    const buku = buatDaftar(judulBuku, penulisBuku, tahunTerbit);

    const objekBuku = komposisiBuku(judulBuku, penulisBuku, tahunTerbit, false);
  
    buku[BUKU_ID] = objekBuku.id;
    daftarBuku.push(objekBuku);

    bukuBelumSelesai.append(buku);

    updateDatadiPenyimpanan();
}

function buatDaftar(dataBuku, penulis, tahun, isCompleted) {
 
    const teksJudul = document.createElement("h2");
    teksJudul.innerText = dataBuku;
 
    const teksPenulis = document.createElement("p");
    teksPenulis.innerText = penulis;

    const teksTahun = document.createElement("p");
    teksTahun.innerText = tahun;
 
    const penampungTeks = document.createElement("div");
    penampungTeks.classList.add("inner")
    penampungTeks.append(teksJudul, teksPenulis, teksTahun);
 
    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(penampungTeks);

    if(isCompleted){
        container.append(TombolHapus(), TombolUndo(), TombolEdit());
    } else {
        container.append(TombolHapus(), TombolCentang(), TombolEdit());
    }
    
    container.append(document.createElement('p').innerText = 'Masukkan data pada form di atas lalu klik tanda pensil pada data yang akan di edit');
    return container;
}

function EditData(taskElement){
    const buku = cariBuku(taskElement[BUKU_ID]);

    let judulBuku = document.getElementById("judul").value;
    let penulisBuku = document.getElementById("penulis").value;
    let tahunTerbit = document.getElementById("tahun").value;

    buku.judul = judulBuku;
    buku.penulis = penulisBuku;
    buku.tahun = tahunTerbit;

    updateDatadiPenyimpanan();
    window.location.reload();
}

function telahSelesai(taskElement) {
    const bukuJudul = taskElement.querySelector(".inner > h2").innerText;
    const bukuPenulis = taskElement.querySelector(".inner > p").innerText;
    const bukuTahun = taskElement.querySelectorAll(".inner > p");

    const Tahun = bukuTahun[1].innerText;
 
    const bukuBaru = buatDaftar(bukuJudul, bukuPenulis, Tahun, true);
    const daftarSelesai = document.getElementById(SELESAI_DIBACA);

    const buku = cariBuku(taskElement[BUKU_ID]);

    buku.isCompleted = true;
    bukuBaru[BUKU_ID] = buku.id;

    daftarSelesai.append(bukuBaru);
    taskElement.remove();

    updateDatadiPenyimpanan();
} 

function hapusDariTelahSelesai(taskElement) {
    const posisiBuku = cariIndexBuku(taskElement[BUKU_ID]);
    daftarBuku.splice(posisiBuku, 1);

    taskElement.remove();

    updateDatadiPenyimpanan();
    
}

function undoSelesai(taskElement){

    const bukuJudul = taskElement.querySelector(".inner > h2").innerText;
    const bukuPenulis = taskElement.querySelector(".inner > p").innerText;
    const bukuTahun = taskElement.querySelectorAll(".inner > p");

    const Tahun = bukuTahun[1].innerText;
    
    const bukuBaru = buatDaftar(bukuJudul, bukuPenulis, Tahun, false);
    const daftarBelumSelesai = document.getElementById(BELUM_SELESAI_DIBACA);

    const buku = cariBuku(taskElement[BUKU_ID]);
    buku.isCompleted = false;
    bukuBaru[BUKU_ID] = buku.id;
 
    daftarBelumSelesai.append(bukuBaru);
    taskElement.remove();

    updateDatadiPenyimpanan();
}

function buatTombol(buttonTypeClass , eventListener) {
    const tombol = document.createElement("button");
    tombol.classList.add(buttonTypeClass);
    tombol.addEventListener("click", function (event) {
        eventListener(event);
    });
    return tombol;
}

function TombolCentang() {
    return buatTombol("tombolSelesai", function(event){
         telahSelesai(event.target.parentElement);
    });
}

function TombolEdit() {
    return buatTombol("tombolEdit", function(event){
         EditData(event.target.parentElement);
    });
}

function TombolHapus() {
    return buatTombol("tombolSampah", function(event){
        hapusDariTelahSelesai(event.target.parentElement);
    });
}

function TombolUndo() {
    return buatTombol("tombolUndo", function(event){
        undoSelesai(event.target.parentElement);
    });
}