import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FoodOption {
  id: number;
  name: string;
  emoji: string;
}

interface WasteReason {
  id: number;
  reason: string;
}

function OperarioDashboard() {
  const [alimentos, setAlimentos] = useState<FoodOption[]>([]);
  const [razones, setRazones] = useState<WasteReason[]>([]);
  const [alimentoSeleccionado, setAlimentoSeleccionado] = useState<FoodOption | null>(null);
  const [cantidad, setCantidad] = useState('');
  const [modoCantidad, setModoCantidad] = useState<'preset' | 'peso'>('preset');
  const [reasonId, setReasonId] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState('');

  const opcionesCantidad = ['0,25kg', '0,50kg', '0,75kg', '1 kg', '2 kg'];

  const token = localStorage.getItem('token');
  const kitchenId = localStorage.getItem('kitchenId');
  const companyId = localStorage.getItem('companyId');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (token && kitchenId) {
      axios.get(`http://localhost:8080/foods/kitchen/${kitchenId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          const foods = res.data ?? [];
          const mapped = foods.map((food: any) => ({
            id: food.id,
            name: food.name,
            emoji: food.foodTypeIcon || '🍽️',
          }));
          setAlimentos(mapped);
        })
        .catch(console.error);

      axios.get("http://localhost:8080/waste-reasons", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => setRazones(res.data))
        .catch(console.error);
    }
  }, [token, kitchenId]);

  const manejarEnvio = () => {
    if (!alimentoSeleccionado || !cantidad || !reasonId) {
      toast.warning("Por favor completa todos los campos.");
      return;
    }

    const cantidadNum = modoCantidad === 'preset'
      ? parseFloat(cantidad.replace(',', '.').replace('kg', '').trim())
      : parseFloat(cantidad);

    const body = {
      userId: Number(userId),
      kitchenId: Number(kitchenId),
      companyId: Number(companyId),
      foodId: alimentoSeleccionado.id,
      quantityKg: cantidadNum,
      reasonId: reasonId
    };

    axios.post('http://localhost:8080/waste-entries', body, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.success(`✅ Registrado: ${cantidadNum}kg de ${alimentoSeleccionado.name}`);
        setAlimentoSeleccionado(null);
        setCantidad('');
        setReasonId(null);
        setBusqueda('');
        setModoCantidad('preset');
      })
      .catch((err) => {
        console.error(err);
        toast.error('❌ Error al registrar. Revisa consola.');
      });
  };

  const limpiarBusqueda = () => setBusqueda('');

  const alimentosFiltrados = alimentos.filter(({ name }) =>
    name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto p-4 font-sans">
      <ToastContainer position="bottom-left" autoClose={3000} hideProgressBar />

      <h1 className="text-2xl font-semibold mb-4 text-center">Registrar Desperdicio de Comida</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona el tipo de alimento</label>
        <div className="relative mb-2">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar alimento..."
            className="w-full px-3 py-2 border rounded-lg text-sm pr-10"
          />
          {busqueda && (
            <button
              onClick={limpiarBusqueda}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 text-xl leading-none"
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
        </div>
        <div className="relative">
          <div className="grid grid-cols-3 gap-2 max-h-[150px] overflow-y-auto pr-1">
            {alimentosFiltrados.map((food) => (
              <button
                key={food.id}
                onClick={() => setAlimentoSeleccionado(food)}
                className={`border rounded-lg p-2 flex items-center justify-center gap-2 text-sm ${
                  alimentoSeleccionado?.id === food.id ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
                }`}
              >
                <span>{food.emoji}</span>
                <span>{food.name.length > 15 ? food.name.slice(0, 12) + '...' : food.name}</span>

              </button>
            ))}
            {alimentosFiltrados.length === 0 && (
              <p className="text-sm text-gray-500 col-span-3 text-center">No se encontraron resultados</p>
            )}
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Elige la cantidad</label>
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setModoCantidad('preset')}
            className={`px-3 py-1 rounded-full text-sm border ${modoCantidad === 'preset' ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'}`}
          >
            Selección rápida
          </button>
          <button
            onClick={() => setModoCantidad('peso')}
            className={`px-3 py-1 rounded-full text-sm border ${modoCantidad === 'peso' ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'}`}
          >
            Peso exacto
          </button>
        </div>

        {modoCantidad === 'preset' ? (
          <div className="flex gap-2 flex-wrap">
            {opcionesCantidad.map((q) => (
              <button
                key={q}
                onClick={() => setCantidad(q)}
                className={`border rounded-lg px-4 py-2 text-sm ${
                  cantidad === q ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="number"
            step="0.01"
            min="0"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Introduce peso en kg (ej. 1.5)"
            className="w-full border rounded-lg px-3 py-2 text-sm mt-2"
          />
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Especifica el motivo</label>
        <select
          value={reasonId ?? ""}
          onChange={(e) => setReasonId(Number(e.target.value))}
          className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700"
        >
          <option value="">Selecciona un motivo</option>
          {razones.map((r) => (
            <option key={r.id} value={r.id}>{r.reason}</option>
          ))}
        </select>
      </div>

      <button
        onClick={manejarEnvio}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
      >
        Registrar
      </button>
    </div>
  );
}

export default OperarioDashboard;
