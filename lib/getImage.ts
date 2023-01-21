import getIPFSLink from "./getIPFSLink";
import imagekitURL from "./getImageKit";

/**
 *
 * @param profile - Profile object
 * @returns avatar image url
 */

const getImage = (image: any): string => {

  //const imageURL = imagekitURL(getIPFSLink(image), "thumbnail");

  const imageURL = getIPFSLink(image);

  console.log("imageURL", imageURL);

  /*
  https://ik.imagekit.io/songpa//tr:n-thumbnail,tr:di-placeholder.webp/https://w3s.link/ipfs/bafkreia747zye6bw6f75hdgslw7jmxbqj425epf2o7mb7ddl7owldhxlzq
  
https://ik.imagekit.io/songpa/tr:n-thumbnail,tr:di-placeholder.webp/https://w3s.link/ipfs/bafkreia747zye6bw6f75hdgslw7jmxbqj425epf2o7mb7ddl7owldhxlzq
  

  https://ik.imagekit.io/demo/tr:w-300,h-300/medium_cafe_B1iTdD0C.jpg
  */

  return imageURL;

};

export default getImage;
