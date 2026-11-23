(() => {
  const canvas = document.querySelector("#strategy-chart");
  const context = canvas.getContext("2d");
  if (!context) return;

  const anchors = [102, 97, 110, 107, 98, 104, 119, 110, 123];
  const barsPerSegment = 12;
  const prices = Array.from({ length: (anchors.length - 1) * barsPerSegment }, (_, index) => {
    const segment = Math.floor(index / barsPerSegment);
    const progress = (index % barsPerSegment) / barsPerSegment;
    const trend = anchors[segment] + (anchors[segment + 1] - anchors[segment]) * progress;
    return trend + 1.6 * Math.sin(index * 1.3) + 0.8 * Math.cos(index * 2.1);
  });

  function movingAverage(period) {
    return prices.map((_, index) => {
      if (index + 1 < period) return null;
      const window = prices.slice(index + 1 - period, index + 1);
      return window.reduce((total, price) => total + price, 0) / period;
    });
  }

  const fast = movingAverage(5);
  const slow = movingAverage(13);
  const signals = [];
  let long = false;

  for (let index = 1; index < prices.length; index += 1) {
    if (slow[index - 1] === null) continue;
    const before = fast[index - 1] - slow[index - 1];
    const current = fast[index] - slow[index];
    if (!long && before <= 0 && current > 0) {
      signals.push({ index, enters: true });
      long = true;
    } else if (long && before >= 0 && current < 0) {
      signals.push({ index, enters: false });
      long = false;
    }
  }

  function draw() {
    const { width, height } = canvas.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.scale(canvas.width / width, canvas.height / height);

    const plotWidth = width - 36;
    const plotHeight = height - 28;
    const left = 4;
    const top = 7;
    const x = (index) => left + (index / (prices.length - 1)) * plotWidth;
    const y = (price) => top + ((126 - price) / (126 - 92)) * plotHeight;

    context.font = "10px ui-monospace, monospace";
    context.lineWidth = 1;
    context.strokeStyle = "#385145";
    context.fillStyle = "#aec0b3";
    context.textBaseline = "middle";
    for (const price of [126, 118, 110, 102, 94]) {
      const row = y(price);
      context.beginPath();
      context.moveTo(left, row);
      context.lineTo(left + plotWidth, row);
      context.stroke();
      context.fillText(price, left + plotWidth + 7, row);
    }

    for (const index of [0, 23, 47, 71, 95]) {
      const column = x(index);
      context.beginPath();
      context.moveTo(column, top);
      context.lineTo(column, top + plotHeight);
      context.stroke();
      context.fillText(index + 1, column, height - 6);
    }

    function drawSeries(values, color, lineWidth) {
      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.lineJoin = "round";
      for (const [index, value] of values.entries()) {
        if (value === null) continue;
        context.lineTo(x(index), y(value));
      }
      context.stroke();
    }

    drawSeries(prices, "#a1b7aa", 1);
    drawSeries(slow, "#78caae", 2);
    drawSeries(fast, "#dff477", 2);

    for (const { index, enters } of signals) {
      context.beginPath();
      context.arc(x(index), y(fast[index]), 4.3, 0, 2 * Math.PI);
      context.fillStyle = enters ? "#dff477" : "#ffae99";
      context.strokeStyle = "#14241d";
      context.lineWidth = 1.5;
      context.fill();
      context.stroke();
    }
  }

  canvas.hidden = false;
  draw();
  new ResizeObserver(draw).observe(canvas);
})();
