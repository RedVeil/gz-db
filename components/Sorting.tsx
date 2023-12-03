import { useRef, useState } from "react";
import MobileModal from "@/components/modal/MobileModal";
import SwitchIcon from "@/components/svg/SwitchIcon";

export interface SortingItem {
  label: string;
  onClick: Function;
  active: boolean;
}

interface SortingProps {
  sortingItems: SortingItem[]
}

export default function Sorting({ sortingItems }: SortingProps): JSX.Element {
  const [openFilter, setOpenSorting] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleClick(onClick: Function) {
    onClick();
    toggleDropdown();
  }

  function toggleDropdown() {
    setOpenSorting(prevState => !prevState)
  }

  return (
    <div className={`relative`}>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleDropdown();
        }}
        className="w-full h-10 px-6 gap-2 flex flex-row items-center justify-between rounded-lg border border-[#626263]"
      >
        <div className="flex items-center">
          <p className="text-primary">Sorting</p>
        </div>
        <SwitchIcon className="w-5 h-5 text-primary" color={"#FFFFFF"} size={"21px"} />
      </button>
      {openFilter && sortingItems.length > 0 && (
        <>
          {/* DESKTOP */}
          < div ref={dropdownRef} className="hidden md:block absolute w-[180px] p-[10px] border border-[#626263] top-16 bg-[#141416] rounded-lg right-0">
            {sortingItems.map(item => (
              <button
                className={`py-2 w-full cursor-pointer text-primary rounded-lg hover:bg-[#23262F] transition ease-in-out duration-250  
                  ${item.active ? 'bg-[#353945]' : 'bg-[#141416]'}`}
                onClick={() => handleClick(item.onClick)}
              >
                {item.label}
              </button>
            ))}
          </div>
          {/* MOBILE */}
          <div className="no-select-dot absolute left-0 block md:hidden">
            <MobileModal visible={openFilter} onClosePopUpModal={() => setOpenSorting(false)}>
              <>
                <p className="text-white mb-3 text-center">Select a sorting type</p>
                <div className="space-y-4 w-full">
                  {sortingItems.map(item => (
                    <button
                      className={`py-2 w-full cursor-pointer text-primary rounded-lg hover:bg-[#23262F] transition ease-in-out duration-250  
                  ${item.active ? 'bg-[#353945]' : 'bg-[#141416]'}`}
                      onClick={() => handleClick(item.onClick)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            </MobileModal>
          </div>
        </>
      )}
    </div >
  );
}
