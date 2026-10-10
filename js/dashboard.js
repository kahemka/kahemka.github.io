 const css = getComputedStyle(document.documentElement);
  const themeColors = () => ({
    text: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim(),
    secondary: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
    border: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim(),
    surface: getComputedStyle(document.documentElement).getPropertyValue('--color-surface').trim()
  });

  function plotLayout(extra = {}) {
    const c = themeColors();
    return {
      margin: { l: 46, r: 18, t: 16, b: 42 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: { family: 'Inter, sans-serif', color: c.secondary, size: 12 },
      xaxis: { gridcolor: c.border, zeroline: false },
      yaxis: { gridcolor: c.border, zeroline: false },
      showlegend: false,
      ...extra
    };
  }

  function renderCharts() {
    const c = themeColors();

    Plotly.react('line-chart', [{
      x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      y: [118, 132, 127, 151, 168, 177, 205, 249],
      type: 'scatter', mode: 'lines+markers',
      line: { color: c.text, width: 2 },
      marker: { color: c.text, size: 6 },
      hovertemplate: '%{x}<br>EUR %{y}m<extra></extra>'
    }], plotLayout(), { responsive: true, displaylogo: false });

    Plotly.react('bar-chart', [{
      x: ['Residential', 'Commercial', 'Industrial', 'Other'],
      y: [42, 31, 19, 8],
      type: 'bar',
      marker: { color: [c.text, c.secondary, '#777777', '#aaaaaa'] },
      hovertemplate: '%{x}<br>%{y}%<extra></extra>'
    }], plotLayout({ yaxis: { gridcolor: c.border, zeroline: false, ticksuffix: '%' } }), { responsive: true, displaylogo: false });
  }

  renderCharts();

  const map = L.map('demo-map', { zoomControl: true }).setView([49.6116, 6.1319], 13);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  }).addTo(map);

  L.circle([49.6116, 6.1319], {
    radius: 900,
    color: '#111111',
    weight: 2,
    fillColor: '#111111',
    fillOpacity: 0.08
  }).addTo(map).bindPopup('Example concentration');

  L.marker([49.6180, 6.1430]).addTo(map).bindPopup('Example location');
  L.marker([49.6038, 6.1292]).addTo(map).bindPopup('Example location');

  const observer = new MutationObserver(() => {
    renderCharts();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
