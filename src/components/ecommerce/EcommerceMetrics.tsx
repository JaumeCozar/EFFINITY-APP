import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

export default function EcommerceMetrics() {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6">
      {/* <!-- Inicio de Métrica --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Producto desperdiciado
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              532 Kg
            </h4>
          </div>
          <Badge color="success">
          <ArrowDownIcon />
            
            11,01%
          </Badge>
        </div>
      </div>
      {/* <!-- Fin de Métrica --> */}

      {/* <!-- Inicio de Métrica --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div> 
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Producto 
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              5.359
            </h4>
          </div>

          <Badge color="error">
          <ArrowUpIcon />
            9,05%
          </Badge>
        </div>
      </div>
      {/* <!-- Fin de Métrica --> */}
    </div>
  );
}
