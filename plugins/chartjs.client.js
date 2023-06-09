export default defineNuxtPlugin(async () => {
  const { default: Chartjs } = await import("chart.js/auto");
  const bodyColor = "#adb5bd";
  const bodyTrack = "#0e161f";
  class Chart {
    constructor (ctx) {
      this.ctx = ctx;
    }

    render ({ dimensions, datasets }) {
      const randomSeed = getRandom(0, 100);
      return new Chartjs(this.ctx, {
        type: "line",
        data: {
          labels: dimensions,
          datasets: datasets.map((chart, i) => {
            const color = generateColor(randomSeed + i);
            const fillColor = color.replace(")", ", 0.1)");
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
                color: bodyColor,
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
                color: bodyTrack
              },
              grid: {
                color: bodyTrack,
                tickColor: bodyTrack
              },
              display: true,
              stacked: true,
              ticks: {
                color: bodyColor,
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
                color: bodyTrack
              },
              grid: {
                color: bodyTrack,
                tickColor: bodyTrack
              },
              ticks: {
                color: bodyColor,
                font: {
                  size: 13
                },
                autoSkip: true
              },
              stacked: false,
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
