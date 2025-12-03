export type TImageFiles = { [fieldName: string]: Express.Multer.File[] };

export type TImageFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  filename: string;
};

// TImageFiles is a TypeScript type defining an object.
// The object:

//     Has dynamic keys (fieldName), which are strings representing the names of the file upload fields (e.g., "projectImages", "thumbnail", etc.).
//     Maps each field name to an array of Express.Multer.File objects, which represent the files uploaded via that field.

// When files are uploaded, the images parameter in createProject will look like this:
// const images: TImageFiles = {
//   projectImages: [
//     {
//       fieldname: 'projectImages',
//       originalname: 'image1.jpg',
//       encoding: '7bit',
//       mimetype: 'image/jpeg',
//       path: '/uploads/image1.jpg',
//       size: 1024,
//       filename: 'image1.jpg',
//     },
//     {
//       fieldname: 'projectImages',
//       originalname: 'image2.jpg',
//       encoding: '7bit',
//       mimetype: 'image/jpeg',
//       path: '/uploads/image2.jpg',
//       size: 2048,
//       filename: 'image2.jpg',
//     },
//   ],
// };
