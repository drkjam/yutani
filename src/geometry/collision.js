'use strict'

function circleTouchesSegment(circle, segment) {
    //  Returns true if segment crosses anywhere inside the circle, false otherwise.
    if(circle.contains(segment.start()) || circle.contains(segment.end())) {
        return true
    } else {
        let v1 = segment.toVector()
        let v2 = new Vector(circle.x - segment.x1, circle.y - segment.y1)
        let v3 = v1.projection(v2)
        let theta = v1.dot(v2) / v2.magnitude()

        let a = new Segment(segment.x1, segment.y1, segment.x1 + v1.x, segment.y1 + v1.y)
        let b = new Segment(segment.x1, segment.y1, segment.x1 + v2.x, segment.y1 + v2.y)
        let c = new Segment(segment.x1, segment.y1, segment.x1 + v3.x, segment.y1 + v3.y)
        let d = new Segment(b.x2, b.y2, c.x2, c.y2)

        return (d.length() <= circle.radius) && (c.length() <= a.length()) && theta >= 0
    }
}


function circleTouchesRectangle(circle, rectangle) {
    //  Returns true if circle overlaps with rectangle, false otherwise.
    let segments = rectangle.segments()
    for(let i=0; i<segments.length; i++) {
        if(circleTouchesSegment(circle, segments[i])) {
            return true
        }
    }
    return false
}
