const spacingSizes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20];

// Objek untuk menampung gaya dinamis
const dynamic = {};

// --- 1. Loop untuk membuat gaya utama ---
spacingSizes.forEach(size => {
    dynamic[`p${size}`] = { padding: size }; //{ paddingTop: size, paddingRight: size, paddingBottom: size, paddingLeft: size };
    dynamic[`pt${size}`] = { paddingTop: size };
    dynamic[`pl${size}`] = { paddingLeft: size };
    dynamic[`pr${size}`] = { paddingRight: size };
    dynamic[`pb${size}`] = { paddingBottom: size };
    dynamic[`px${size}`] = { paddingLeft: size, paddingRight: size };
    dynamic[`py${size}`] = { paddingTop: size, paddingBottom: size };
});

dynamic.pBig = { padding: 40 };

export default dynamic;