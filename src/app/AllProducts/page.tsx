import SideBar from "./sidebar";
import ShoesPage2 from "./shoesPage";
export default function AllProducts() {
  return (
    <div className="px-6">
      <TopHead />
      <div className="flex">
        <SideBar />

        <ShoesPage2 />
      </div>
      <BottomBar />
    </div>
  );
}
