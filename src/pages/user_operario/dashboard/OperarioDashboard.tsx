import { useState } from 'react';

function OperarioDashboard() {
   const [alimento, setAlimento] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [modoCantidad, setModoCantidad] = useState<'preset' | 'peso'>('preset');
  const [motivo, setMotivo] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const opcionesAlimento = [
    { emoji: '🍞', label: 'Pan' },
    { emoji: '🥗', label: 'Ensalada' },
    { emoji: '🍗', label: 'Pollo' },
    { emoji: '🧀', label: 'Sopa' },
    { emoji: '🐟', label: 'Pescado' },
    { emoji: '🍎', label: 'Fruta' },
    { emoji: '🥔', label: 'Patatas' },
    { emoji: '🥕', label: 'Verduras' },
    { emoji: '🍚', label: 'Arroz' },
    { emoji: '🥩', label: 'Carne' },
    { emoji: '🍝', label: 'Pasta' },
    { emoji: '🥒', label: 'Pepino' }
  ];

  const opcionesCantidad = ['0,25kg', '0,50kg', '0,75kg', '1 kg', '2 kg'];

  const opcionesMotivo = [
    'Sobreproducción',
    'Caducado',
    'Estropeado',
    'Devuelto por cliente'
  ];

  const manejarEnvio = () => {
    if (alimento && cantidad && motivo) {
      alert(`Registrado: ${cantidad} de ${alimento} - Motivo: ${motivo}`);
      setAlimento('');
      setCantidad('');
      setMotivo('');
      setBusqueda('');
      setModoCantidad('preset');
    } else {
      alert('Por favor completa todos los campos.');
    }
  };

  const limpiarBusqueda = () => {
    setBusqueda('');
  };

  const alimentosFiltrados = opcionesAlimento.filter(({ label }) =>
    label.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto p-4 font-sans">
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
          <div id="alimentos-grid" className="grid grid-cols-3 gap-2 max-h-[150px] overflow-y-auto pr-1">
            {alimentosFiltrados.map(({ emoji, label }) => (
              <button
                key={label}
                onClick={() => setAlimento(label)}
                className={`border rounded-lg p-2 flex items-center justify-center gap-2 text-sm ${
                  alimento === label ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
                }`}
              >
                <span>{emoji}</span>
                <span>{label}</span>
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
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700"
        >
          <option value="">Selecciona un motivo</option>
          {opcionesMotivo.map((r) => (
            <option key={r} value={r}>{r}</option>
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

export default OperarioDashboard
