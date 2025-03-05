//Images for the Iphone 15 Pro Max -1
import i15_1_1 from '@/asset/Iphone15/id1/images/img1.webp'
import i15_1_2 from '@/asset/Iphone15/id1/images/img2.webp'
import i15_1_3 from '@/asset/Iphone15/id1/images/img3.webp'
import i15_1_4 from '@/asset/Iphone15/id1/images/img4.webp'
// Video For The Iphone 15 Pro Max - 1
const i15PM1Vid = '/iphone15PM1.mp4'
//Images for the Iphone 15 Pro Max - 1 Specifications
import blackTita from '@/asset/Iphone15/id1/images/specImages/blackTita.avif'
import blueTita from '@/asset/Iphone15/id1/images/specImages/blueTita.avif'
import naturalTita from '@/asset/Iphone15/id1/images/specImages/naturalTita.avif'
import whiteTita from '@/asset/Iphone15/id1/images/specImages/whiteTita.avif'
//Images for the Iphone 16 Pro Max -1
import i16_1_1 from '@/asset/Iphone16/id1/images/img1.webp'
import i16_1_2 from '@/asset/Iphone16/id1/images/img2.webp'
import i16_1_3 from '@/asset/Iphone16/id1/images/img3.webp'
// Video For The Iphone 16 Pro Max - 1
const i16PM1Vid = '/iphone16PM1.mp4'
//Images for the Iphone 16 Pro Max - 1 Specifications
import black from '@/asset/Iphone16/id1/images/specImages/black.avif'
import blue from '@/asset/Iphone16/id1/images/specImages/blue.avif'
import gray from '@/asset/Iphone16/id1/images/specImages/gray.avif'
import white from '@/asset/Iphone16/id1/images/specImages/white.avif'

export const Iphone15 = [
    {
        allImg: [i15_1_1, i15_1_2, i15_1_3, i15_1_4],
        colors: ["Black Titanium"],
        colorsImg: [blackTita,],
        id: "loot-titan-clone-iphone15-1",
        name: "Iphone 15 Pro Max Clone",
        price: `500,000`,
        ram: "8GB",
        rating: 4.8,
        specifications: "Best sell Iphone 15 pro max clone 6.7 inch unlocked 8GB RAM + 1TB ROM Cellphone mobile phones 4G 5G WIFI",
        storage: "1TB",
        video: i15PM1Vid,
        confirmed: false,
    },
];
export const Iphone16 = [
    {
        allImg: [i16_1_1, i16_1_2, i16_1_3],
        colors: ["White",],
        colorsImg: [white,],
        id: "loot-titan-clone-iphone16-1",
        name: "Iphone 16 Pro Max Clone",
        price: `230,000`,
        ram: "16GB",
        rating: 4.8,
        specifications: "New original i16 phone 16 pro max 5g smartphone new arrival 6.8 Inches 16GB+512GB phone 16 clone Unlocked Android Mobile Phones",
        storage: "1TB",
        video: i16PM1Vid,
        confirmed: false,
    },
];
export const cloneIphones = [...Iphone15, ...Iphone16];
