import type { Product } from "../types/product"

const mockProducts: Product[] = [
    {
      "id": "1",
      "name": "Premium Wireless Headphones",
      "description": "Rasakan suara jernih dengan headphone nirkabel premium kami. Dilengkapi dengan pembatalan kebisingan dan daya tahan baterai hingga 20 jam. Sempurna untuk pecinta musik dan profesional yang membutuhkan audio berkualitas tinggi saat bepergian. Tali kepala yang dapat disesuaikan dan ear cup yang nyaman untuk pemakaian lama.",
      "price": 2249000,
      "image": "https://images.pexels.com/photos/5081386/pexels-photo-5081386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "stock": 15,
      "category": "Elektronik"
    },
    {
      "id": "2",
      "name": "Organic Cotton T-Shirt",
      "description": "Kaos katun organik yang lembut dan bernapas. Sumber etis dan ramah lingkungan. Dibuat dengan 100% katun organik bersertifikat GOTS, kaos ini sempurna untuk pemakaian sehari-hari. Tersedia dalam berbagai warna dan ukuran untuk tampilan kasual yang nyaman.",
      "price": 479000,
      "image": "https://images.pexels.com/photos/17522292/pexels-photo-17522292/free-photo-of-olahraga-tenis-bersih-keranjang.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "stock": 50,
      "category": "Pakaian"
    },
    {
      "id": "3",
      "name": "Smart Fitness Tracker",
      "description": "Lacak langkah, detak jantung, kualitas tidur, dan lebih banyak lagi dengan pelacak kebugaran canggih ini. Desain tahan air dengan layar sentuh berwarna. Terhubung secara nirkabel dengan smartphone Anda untuk memberikan wawasan kesehatan dan laporan aktivitas yang detail.",
      "price": 1299000,
      "image": "https://images.pexels.com/photos/4482933/pexels-photo-4482933.jpeg?auto=compress&cs=tinysrgb&w=600",
      "stock": 8,
      "category": "Elektronik"
    },
    {
      "id": "4",
      "name": "Stainless Steel Water Bottle",
      "description": "Pertahankan minuman Anda tetap dingin selama 24 jam atau panas selama 12 jam dengan botol air berinsulasi vakum ini. Terbuat dari stainless steel 18/8 berkualitas tinggi yang bebas BPA dan ramah lingkungan. Dilengkapi dengan tutup anti bocor dan dasar tidak licin untuk penggunaan sehari-hari.",
      "price": 379000,
      "image": "https://images.pexels.com/photos/9508458/pexels-photo-9508458.jpeg?auto=compress&cs=tinysrgb&w=600",
      "stock": 30,
      "category": "Peralatan Rumah"
    },
    {
      "id": "5",
      "name": "Leather Wallet",
      "description": "Dompet kulit asli yang dibuat dengan tangan dengan perlindungan RFID dan beberapa slot kartu. Dompet bifold ramping ini terbuat dari kulit full-grain premium yang akan mengembangkan patina indah seiring waktu. Termasuk 8 slot kartu, 2 kompartemen uang, dan teknologi pemblokiran RFID.",
      "price": 639000,
      "image": "https://images.pexels.com/photos/4452635/pexels-photo-4452635.jpeg?auto=compress&cs=tinysrgb&w=600",
      "stock": 12,
      "category": "Aksesoris"
    },
    {
      "id": "6",
      "name": "Ceramic Coffee Mug",
      "description": "Cangkir kopi keramik elegan dengan pegangan yang nyaman dan dasar tidak licin. Cangkir 12oz ini aman digunakan di microwave dan pencuci piring, sempurna untuk kopi pagi atau teh sore Anda. Finishing glasir tersedia dalam berbagai warna untuk mencocokkan dekorasi dapur Anda.",
      "price": 239000,
      "image": "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=600",
      "stock": 25,
      "category": "Peralatan Rumah"
    },
    {
      "id": "7",
      "name": "Bluetooth Portable Speaker",
      "description": "Speaker Bluetooth portabel yang kompak namun kuat dengan daya tahan baterai 10 jam dan tahan air. Menghasilkan suara kaya yang mengisi ruangan dengan bass yang lebih dalam. Rating tahan air IPX7 menjadikannya sempurna untuk petualangan luar ruangan, perjalanan ke pantai, atau pesta di tepi kolam.",
      "price": 899000,
      "image": "https://images.pexels.com/photos/14309806/pexels-photo-14309806.jpeg?auto=compress&cs=tinysrgb&w=600",
      "stock": 18,
      "category": "Elektronik"
    },
    {
      "id": "8",
      "name": "Yoga Mat",
      "description": "Matras yoga anti-slip dan ramah lingkungan dengan tanda penyesuaian posisi yang tepat. Terbuat dari bahan TPE yang dapat terurai, dapat didaur ulang, dan bebas PVC, ftalat, dan lateks. Ketebalan 6mm memberikan bantalan untuk sendi sekaligus menjaga stabilitas untuk posisi keseimbangan.",
      "price": 529000,
      "image": "https://images.pexels.com/photos/3458199/pexels-photo-3458199.jpeg?auto=compress&cs=tinysrgb&w=600",
      "stock": 20,
      "category": "Fitness"
    }
  ]
  

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchProducts(): Promise<Product[]> {
  await delay(800)
  return mockProducts
}

export async function fetchProductById(id: string): Promise<Product> {
  await delay(500)

  const product = mockProducts.find((p) => p.id === id)

  if (!product) {
    throw new Error("Product not found")
  }

  return product
}

export async function searchProducts(query: string): Promise<Product[]> {
  await delay(500)

  const lowercaseQuery = query.toLowerCase()

  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) || product.description.toLowerCase().includes(lowercaseQuery),
  )
}

