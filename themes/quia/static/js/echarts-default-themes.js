/* ---- LIGHT ---------------------------------------------------- */
const lightTheme = {
  color: [
    '#2f79c9', '#5fae59', '#f4c542', '#e26c5e',
    '#48b9d4', '#3ba272', '#f08c4b', '#a266b4', '#e18cb1'
  ],
  backgroundColor: '#f6f6f6', // matches --bg
  textStyle: { color: '#111' }, // --fg
  title: { textStyle: { color: '#111' } },
  legend: { textStyle: { color: '#444' } }, // --fg-muted-bright
  tooltip: {
    backgroundColor: 'rgba(30,30,30,0.9)',
    borderColor: '#c9c9c9', // --border
    textStyle: { color: '#fff' }
  },
  axisPointer: {
    lineStyle:  { color: '#888' },  // --accent
    crossStyle: { color: '#888' },
    shadowStyle:{ color: 'rgba(0,0,0,0.04)' }
  },
  grid: { borderColor: '#c9c9c9' }, // --border
  xAxis: {
    axisLine:  { lineStyle: { color: '#888' } }, // --accent
    axisTick:  { lineStyle: { color: '#888' } },
    splitLine: { lineStyle: { color: '#ddd' } }, // --pre-bg
    nameTextStyle: { color: '#666' } // --fg-muted
  },
  yAxis: {
    axisLine:  { lineStyle: { color: '#888' } },
    axisTick:  { lineStyle: { color: '#888' } },
    splitLine: { lineStyle: { color: '#ddd' } },
    nameTextStyle: { color: '#666' }
  }
};

/* ---- DARK ----------------------------------------------------- */
const darkTheme = {
  color: [
    '#66b1ff', '#82f9c9', '#ffd859', '#ff7b84',
    '#68dff9', '#08d2a5', '#ffc47a', '#b98fff', '#ec8fb8'
  ],
  backgroundColor: '#181818', // matches --bg
  textStyle: { color: '#eee' }, // --fg
  title: { textStyle: { color: '#eee' } },
  legend: { textStyle: { color: '#c9c9c9' } }, // --fg-muted-bright
  tooltip: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderColor: '#555', // --border
    textStyle: { color: '#eee' }
  },
  axisPointer: {
    lineStyle:  { color: '#aaa' }, // --fg-muted
    crossStyle: { color: '#aaa' },
    shadowStyle:{ color: 'rgba(255,255,255,0.05)' }
  },
  grid: { borderColor: '#555' }, // --border
  xAxis: {
    axisLine:  { lineStyle: { color: '#aaa' } },
    axisTick:  { lineStyle: { color: '#aaa' } },
    splitLine: { lineStyle: { color: '#333' } }, // --ex-bg / --pre-bg
    nameTextStyle: { color: '#aaa' }
  },
  yAxis: {
    axisLine:  { lineStyle: { color: '#aaa' } },
    axisTick:  { lineStyle: { color: '#aaa' } },
    splitLine: { lineStyle: { color: '#333' } },
    nameTextStyle: { color: '#aaa' }
  }
};

/* ---- Register both once -------------------------------------- */
echarts.registerTheme('light-default', lightTheme);
echarts.registerTheme('dark-default',  darkTheme);
