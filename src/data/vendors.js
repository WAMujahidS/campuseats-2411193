const vendors = [
 {
 id: 'my-restaurant',
 name: "Hanafi's Kitchen",
 location: 'Mahallah Uthman, Block E',
 openHours: '8:00 am - 10:00 pm',
 isOpen: true,
 menu: [
 { id: 'my-1', name: 'Nasi Lemak Ayam', description: 'Coconut rice, fried chicken, sambal and egg', price: 7, category: 'Rice',
available: true },
 { id: 'my-2', name: 'Mee Goreng', description: 'Fried noodles with vegetables and egg', price: 5.5, category:
'Noodles', available: true },
 { id: 'my-3', name: 'Iced Milo', description: 'Chilled chocolate malt drink', price: 2.8, category:
'Drinks', available: false },
 ],
 },
 {
 id: 'kafe-aminah',
 name: 'Kafe Mahallah Aminah',
 location: 'Mahallah Aminah, Ground Floor',
 openHours: '8:00 am - 9:00 pm',
 isOpen: true,
 menu: [
 { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9, category: 'Rice', available: true },
 { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price:
3, category: 'Drinks', available: true },
 ],
 },
]
export default vendors