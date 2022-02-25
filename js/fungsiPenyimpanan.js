const KEY = "CATATAN_BUKU";
 
let daftarBuku = [];
 
function cekStorage() {
   if(typeof(Storage) === undefined){
       alert("Browser tidak mendukung local storage");
       return false
   }
   return true;
}
 
function komposisiBuku(judul, penulis, tahun, isCompleted) {
    return {
        id: +new Date(),
        judul,
        penulis,
        tahun,
        isCompleted
    };
 }
  
function simpanData() {
   const parsed = JSON.stringify(daftarBuku);
   localStorage.setItem(KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function tampilkanData() {
   const serializedData = localStorage.getItem(KEY);
   
   let buku = JSON.parse(serializedData);
   
   if(buku !== null)
       daftarBuku = buku;
 
   document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDatadiPenyimpanan() {
   if(cekStorage())
       simpanData();
}
 
function cariBuku(IDbuku) {

   for(buku of daftarBuku){
       if(buku.id === IDbuku)
           return buku;
   }
   return null;
}
 
function cariIndexBuku(IDbuku) {
   let index = 0
   for (buku of daftarBuku) {
       if(buku.id === IDbuku )
           return index;
 
       index++;
   }
 
   return -1;
}

function refreshDaftarBuku() {
    const belumSelesai = document.getElementById(BELUM_SELESAI_DIBACA);
    let bukuSelesai = document.getElementById(SELESAI_DIBACA);
  
    for(buku of daftarBuku){
        const bukuBaru = buatDaftar(buku.judul, buku.penulis, buku.tahun, buku.isCompleted);
        bukuBaru[BUKU_ID] = buku.id;
  
        if(buku.isCompleted){
            bukuSelesai.append(bukuBaru);
        } else {
            belumSelesai.append(bukuBaru);
        }
    }
}