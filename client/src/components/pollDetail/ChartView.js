import React from "react"
import { select, treemap, hierarchy, mouse } from "d3"
import { makeStyles } from "@material-ui/core/styles"
import useResizeObserver from "../../hooks/useResizeObserver"
import { colors, dummyResults } from "./ChartVariables"
const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
  svg: {
    height: "100%",
    width: "100%",
    borderRadius: "8px",
  },
  tooltip: {
    background: "rgba(255,255,255, .8)",
    position: "absolute",
    borderRadius: "8px",
    padding: theme.spacing(1),
    "& h5": {
      margin: "0 0 8px 0",
    },
    "& p": {
      margin: 0,
    },
    overflowX: "visible",
    whiteSpace: "nowrap",
  },
}))

function ChartView({ poll }) {
  const classes = useStyles()
  const svgRef = React.useRef()
  const wrapperRef = React.useRef()
  const dimensions = useResizeObserver(wrapperRef)
  const [data, setData] = React.useState("")
  //Convert api data into usable Data Obj

  const createDataObj = (data, name) => {
    if (!data) return
    let newObj = { name: name, children: [] }
    for (let [key, value] of Object.entries(data)) {
      newObj.children.push({ name: key, value })
    }
    return newObj
  }

  React.useEffect(() => {
    let data
    if (poll.results) data = createDataObj(poll.results, poll.title)
    data && setData(data)
  }, [poll])

  React.useEffect(() => {
    const svg = select(svgRef.current)
    const wrapper = select(wrapperRef.current)
    if (!dimensions) return
    const { width, height } = dimensions
    //Prepare data and treemap hierarchical structure
    const root = hierarchy(data).sum((d) => d.value)
    treemap().size([width, height]).padding(1)(root)
    //Create rectangles
    svg.selectAll("rect").remove()
    svg
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
      .attr("x", (d) => {
        return d.x0
      })
      .attr("y", (d) => {
        return d.y0
      })
      .attr("width", (d) => {
        return d.x1 - d.x0
      })
      .attr("height", (d) => {
        return d.y1 - d.y0
      })
      .style("stroke", "white")
      .style("fill", (d, i) => colors[i % colors.length])
      //Add Tooltip
      .on("mousemove", (value, index) => {
        const [x, y] = mouse(svgRef.current)
        wrapper
          .selectAll(".tooltip-tree")
          .data([value])
          .join("div")
          .attr("class", `tooltip-tree ${classes.tooltip}`)
          .html((data) => {
            return data.data
              ? `<h5>${data.data.name}</h5><p>${data.data.value} out of ${data.parent.value}</p>`
              : ""
          })
          .style("position", "absolute")
          .style("top", (d) => {
            return y - 10 + "px"
          })
          .style("left", (d) => {
            return x + 20 + "px"
          })
      })
      .on("mouseleave", () => wrapper.select(".tooltip-tree").remove())
    //Add inner Text
    svg.selectAll("text").remove()
    svg
      .selectAll("text")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("x", function (d) {
        return d.x0 + 5
      })
      .attr("y", function (d) {
        return d.y0 + 20
      })
      .text(function (d) {
        return d.data.name
      })
      .attr("font-size", "14px")
      .attr("fill", "white")
      .attr("font-family", "Roboto")
  }, [data, dimensions])

  return (
    <React.Fragment>
      <div className={classes.wrapper} ref={wrapperRef}>
        <svg className={classes.svg} ref={svgRef}></svg>
      </div>
    </React.Fragment>
  )
}

export default ChartView
