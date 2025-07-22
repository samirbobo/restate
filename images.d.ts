// constants\icons.ts انا انشاءت الملف دا عشان لو روحت علي المسار دا 
// import (name of Image) from "@/assets/icons/google.png"; هتلاقي الصور بعملها امبورت بالشكل دا
// @ ولما بعمل كده التايب سكريبت بيبعت ايرور انه مش فاهم المسار بسبب العلامه ديه
// وهي طريقه كتابه مسار الصوره بشكل مختصر وعشان تشتغل لازم اعمل الملف دا عشان افهمه ان المسارات الي اخيرها الامتداتا التاليه هي صور عادي

declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module "*.jpeg" {
  const value: any;
  export default value;
}

declare module "*.gif" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}
