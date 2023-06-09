export default defineNuxtPlugin(async () => {
  const { default: Chartjs } = await import("chart.js/auto");
  const bodyColor = "#0e161f";
  class Chart {
    constructor (ctx) {
      this.ctx = ctx;
    }

    render ({ dimensions, datasets }, callback) {
      const randomSeed = getRandom(0, 100);
      return new Chartjs(this.ctx, {
        type: "line",
        data: {
          labels: dimensions,
          datasets: datasets.map((chart, i) => {
            const color = generateColor(randomSeed + i);
            const fillColor = color.replace(")", ", 0.2)");
            return {
              data: chart.data,
              label: chart.label,
              backgroundColor: color,
              borderColor: color,
              fill: {
                target: "origin",
                above: `${fillColor}`
              }
            };
          })
        },
        options: {
          plugins: {
            title: {
              display: false
            },
            legend: {
              display: true,
              position: "bottom",
              labels: {
                boxWidth: 16,
                boxHeight: 16,
                useBorderRadius: true,
                borderRadius: 8,
                font: {
                  size: 16
                }
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false
          },
          tooltips: {
            mode: "interpolate",
            intersect: false
          },
          scales: {
            x: {
              border: {
                color: bodyColor
              },
              grid: {
                color: bodyColor,
                tickColor: bodyColor
              },
              display: true,
              stacked: true,
              ticks: {
                font: {
                  size: 16
                },
                autoSkip: true,
                maxRotation: 0,
                minRotation: 0
              }
            },
            y: {
              border: {
                color: bodyColor
              },
              grid: {
                color: bodyColor,
                tickColor: bodyColor
              },
              ticks: {
                font: {
                  size: 13
                },
                autoSkip: true
              },
              stacked: true,
              beginAtZero: true
            }
          }
        }
      });
    }

    static getInstances () {
      return Object.values(Chartjs.instances);
    }

    static destroyAll () {
      this.getInstances().forEach(chart => chart.destroy());
    }
  }

  return {
    provide: { Chart }
  };
});
