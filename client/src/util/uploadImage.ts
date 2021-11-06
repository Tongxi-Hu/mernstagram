export const checkImage=(file: File)=>{
  let err="";
  if (!file) err="file not exist";
  if (file.size>1024*1024) err="file too large";
  if (file.type!=="image/jpeg" && file.type!=="image/png")
    err="not a image";
  return err;
};

export const uploadImage=async (images: Array<File>)=>{
  const imageURLs: Array<{ public_id: string, url: string }>=[];
  for (const image of images) {
    const formData=new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "spy3u6pb");
    formData.append("cloud_name", "dgwlarrte");
    const res=await fetch("https://api.cloudinary.com/v1_1/dgwlarrte/image/upload", {
      method: "POST",
      body: formData
    });
    const data=await res.json();
    imageURLs.push({public_id: data.public_id, url: data.secure_url});
  }
  return imageURLs;
};