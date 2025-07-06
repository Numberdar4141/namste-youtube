import ButtonCarousel from "./ButtonList";
import VedioContainer from "./VedioContainer";

const MainContainer = () => {
  return (
    <div className=" no-scrollbar mx-auto">
      <div className="sticky top-0 z-40 backdrop-blur-xs no-scrollbar bg-white/95  px-4 py-2 overflow-hidden">
        <ButtonCarousel />
      </div>
      <VedioContainer />
    </div>
  );
};

export default MainContainer;
