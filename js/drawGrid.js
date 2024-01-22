function drawGrid(ctx) {
    // Draw V lines
    
    ctx.beginPath();
    ctx.strokeStyle="#FF0000";
    //繪製X軸紅線
    for(i=0;i<1800;i=i+36)
    {
        ctx.moveTo(i,0);
        ctx.lineTo(i,800);
    }
    //繪製Y軸紅線
    for(i=0;i<800; i=i+40)
    {
        ctx.moveTo(0,i);
        ctx.lineTo(1800,i);
    }
    ctx.stroke();
    
    //繪製X軸粗紅線
    ctx.beginPath();
    ctx.lineWidth = 3;
    for(i=-1;i<=800; i=i+200)//*5
    {
        ctx.moveTo(0,i);
        ctx.lineTo(1800,i);
    }
    //繪製Y軸粗紅線
    for(i=-1;i<=1800; i=i+360)//*10
    {
        ctx.moveTo(i,0);
        ctx.lineTo(i,800);
    }
    
    ctx.stroke();
}

