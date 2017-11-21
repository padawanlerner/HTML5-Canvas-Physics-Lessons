const move = (state) => ({
  move: (dt) => {
    // console.log("Prior position = " + state.x)
    state.x+=dt*state.vx;
    state.y+=dt*state.vy;
    // console.log("after position = " + state.x)


  }
})

const acclerate = (state) => ({
  accelerate: (ax, ay, dt) =>{
    state.vx+= ax*dt;
    state.vy+= ay*dt;
  }
})

const collide = (state) => ({
  collide: ()=>{
    state.vy = -state.vy*state.restitution;
    state.vx = -state.vx*state.restitution;
  }
})

const draw = (state) => ({
  draw: (context) => {
    switch (state.shape) {
      case 1: //ball
        context.beginPath()
        context.arc(state.x, state.y, state.rad, 0, Math.PI * 2)
        context.stroke()
        context.fill()

        break;
      case 2: //axis
        if (state.isVertical) {

        } else {
          context.beginPath()
          context.moveTo(state.min, state.pos);
          context.lineTo(state.max, state.pos);
          context.stroke()

          for (let i = state.minVal; i < state.numTicks+state.minVal; i++) {
            context.moveTo(state.ftp+state.spacing*(i), state.pos-15);
            context.lineTo(state.ftp+state.spacing*(i), state.pos+15);
            context.stroke()

            context.font="20px Georgia";
            context.fillText(i*state.interval, state.ftp+state.spacing*(i)-25, state.pos+25)

          }

        }

        break;
      default:

    }
  }
})

const axis = (min, max, spaceBet, isVertical, pos, firstTickPos, numTicks, firstTickVal, tickInterval) =>{
  let state = {
    min: min,
    max: max,
    spacing: spaceBet,
    shape: 2,
    isVertical: isVertical,
    pos: pos, //since you're always making either a horizontal or vertical line, this is the coordinate that stays the same
    ftp: firstTickPos,
    minVal: firstTickVal,
    maxVal: firstTickVal+numTicks*tickInterval,
    numTicks: numTicks,
    interval: tickInterval
  }

  return Object.assign(state, draw(state));
}

const ball = (rest, radius, _x, _y, _vx, _vy, color) =>{
  let state = {
    shape: 1,
    x: _x,
    y: _y,
    vx: _vx,
    vy: _vy,
    restitution: rest,
    rad: radius,
    color: color
  }

  return Object.assign(state, acclerate(state), move(state), collide(state), draw(state));
}
