import { fetchNavigation } from "@/lib/shopify/queries/navigation";
import "./styles.css";
async function Navbar() {
  const navigation = await fetchNavigation();
  return (
    <div className="navbar py-0 h-12 px-12 bg-white sticky z-10">
      <div className="navbar-start">LOGO</div>
      <div className="navbar-center hidden lg:flex h-full grow gap-5 justify-center items-center">
        {navigation.menu.items.map((topItem) => (
          <>
            <div className="drop-trigger h-full flex justify-center items-center">
              <div
                className="font-medium flex justify-center items-center border-b-2 border-solid border-black border-opacity-0 hover:border-opacity-100 box-border transition-all duration-150"
                key={topItem.id}
              >
                {topItem.title}
              </div>
              {!!topItem.items.length && (
                <div className={`drop grid grid-cols-4 gap-4`} key={topItem.id}>
                  {topItem.items.map((subItem) => (
                    <div
                      className="col-span-1 flex flex-col space-y-2"
                      key={subItem.id}
                    >
                      <div className="text-sm font-medium pb-1">
                        {subItem.title}
                      </div>
                      {subItem.items.map((nodeItem) => (
                        <div
                          className="text-sm text-gray-500"
                          key={nodeItem.id}
                        >
                          {nodeItem.title}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ))}
      </div>
      <div className="navbar-end h-full">
        <div className="h-full py-3">
          <input
            type="text"
            placeholder="Search"
            className="input h-full w-48 max-w-xs focus:outline-none rounded-full bg-stone-100 hover:bg-stone-200"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
