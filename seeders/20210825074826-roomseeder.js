'use strict';



module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('VideoRooms',[
     {
     name: 'Anime',
     description: "You smell like garlic but that's okay, you're not alone! Enter this chat room and meet other people who also smell like garlic!",
     url:'https://garryfishy.daily.co/Anime',
     imgUrl: 'https://cdn.idntimes.com/content-images/community/2020/09/9a2ca8003fc55c92ed1245c8dba8cf2460bcaf46-copy-616x347-f1141fda1a7411e87c8978bfcfdab6f9_600x400.jpg',
     createdAt: new Date(),
     updatedAt: new Date(),
     },
     {
      name: 'TV-Show',
      description: 'Kids, let me tell you a story about my favorite TV Show.',
      url:'https://garryfishy.daily.co/TV-show',
      imgUrl: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/haifoto/original/26116_siap-siap-tonton-istri-ted-di-musim-final-how-i-met-your-mother.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
     name: 'Games',
     description: 'Tired of playing video games all day? Good! Enter this room and share about your gaming experience, find new gaming buddies!',
     url:'https://garryfishy.daily.co/Games',
     imgUrl: 'https://gamingbolt.com/wp-content/uploads/2019/07/kingdom-hearts-3.jpg',
     createdAt: new Date(),
     updatedAt: new Date(),
     },
  ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('VideoRooms', null, {})
  }
};
