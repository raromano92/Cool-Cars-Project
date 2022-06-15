// DEPENDENCIES
const express = require('express');
const seed = require('../models/seed');
const myCars = require('../models/cars');
const router = express.Router();

// db.on('open', () => {
    router.get('/', (req, res) => {
        // array of starter cars
        const startCars = [
            {
                Year: 1997,
                Make: 'Toyota',
                Model: 'Supra',
                Color: 'Black',
                Price: 60000,
                Img: 'https://ic-cdn.flipboard.com/bringatrailer.com/768bb2aaaa92bef087986d3f4b8f567d1cb59e12/_medium.jpeg',
            },
            {
                Year: 1995,
                Make: 'Mazda',
                Model: 'Rx7',
                Color: 'White',
                Price: 50000,
                Img: 'https://i.pinimg.com/originals/71/55/ce/7155cee901b5ad71dbdac4d55ac5b4fd.jpg',
            },
            {
                Year: 1996,
                Make: 'Nissan',
                Model: 'Skyline',
                Color: 'Yellow',
                Price: 70000,
                Img: 'https://1.bp.blogspot.com/-pkTLtshULu4/WHvH_Ngkg5I/AAAAAAADvXE/bKiK77TotZ8qY8sddVqKw6E92-2RivHWgCPcBGAYYCw/s640/1st.JPG',
            },
            {
                Year: 2004,
                Make: 'Subaru',
                Model: 'Wrx',
                Color: 'Blue',
                Price: 40000,
                Img: 'https://preview.redd.it/13puwvtjr0a61.jpg?auto=webp&s=4c38a82f1ebdb340a91ee8c2e1896aee03bab256',
            },
            {
                Year: 1968,
                Make: 'Chevrolet',
                Model: 'Camaro',
                Color: 'Black',
                Price: 90000,
                Img: 'https://s.yimg.com/os/en-US/cms/autos/Boldride/1968-chevrolet-camaro-protouring1.jpg',
            },
            {
                Year: 1970,
                Make: 'Chevrolet',
                Model: 'Nova',
                Color: 'Gold',
                Price: 75000,
                Img: 'https://barrettjacksoncdn.azureedge.net/staging/carlist/items/Fullsize/Cars/177569/177569_Front_3-4_Web.JPG',
            },
            {
                Year: 1994,
                Make: 'Honda',
                Model: 'Nsx',
                Color: 'Red',
                Price: 65000,
                Img: 'https://bestcarmagz.net/sites/default/files/227034339475740404_original.jpg',
            },
            {
                Year: 1969,
                Make: 'Ford',
                Model: 'Mustang',
                Color: 'Silver',
                Price: 100000,
                Img: 'https://images.hgmsites.net/hug/classic-recreations-1969-ford-mustang-mach-1-hitman_100736009_h.jpg',
            },
        ];
        // Delete all fruits
        myCars.deleteMany({}).then((data) => {
            // Seed Starter Fruits
            myCars.create(startCars).then((data) => {
                // send created fruits as response to confirm creation
                res.json(data);
            });
        });
    });

    module.exports = router