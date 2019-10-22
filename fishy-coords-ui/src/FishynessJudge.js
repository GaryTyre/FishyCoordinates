import * as geolib from 'geolib';

class FishynessJudge
{
    static Level =
    {
        ok: 0,
        questionable: 1,
        notOk: 2,
        unknown: 3
    }

    static colorForLevel(level, opacity = null)
    {
        if (opacity === null) { opacity = 1.0 };

        switch (level)
        {
            case FishynessJudge.Level.ok:
                return `rgba(0,200,0,${opacity})`;
            case FishynessJudge.Level.questionable:
                return `rgba(255,190,100,${opacity})`;
            case FishynessJudge.Level.notOk:
                return `rgba(255,100,100,${opacity})`;
            case FishynessJudge.Level.unknown:
            default:
                return `rgba(180,180,180,${opacity})`;
        }
    }
    
    constructor(_catch, region, prevPing, nextPing)
    {
        this._catch = _catch;
        this.region = region;
        this.prevPing = prevPing;
        this.nextPing = nextPing;
    }

    inRegion(loc)
    {
        return geolib.isPointInPolygon(
            loc,
            this.region.polygon
        );
    }

    level()
    {
        if (!this.inRegion(this._catch.location))
        {
            return FishynessJudge.Level.notOk;
        }

        if ((this.prevPing === null) || (this.nextPing === null))
        {
            return FishynessJudge.Level.unknown;
        }
       
        let prevInRegion = this.inRegion(this.prevPing.location);
        let nextInRegion = this.inRegion(this.nextPing.location);
       
        if (!prevInRegion && !nextInRegion)
        {
            return FishynessJudge.Level.notOk;
        }

        if (!prevInRegion || !nextInRegion)
        {
            return FishynessJudge.Level.questionable;
        }

        return FishynessJudge.Level.ok;
    }
}

export default FishynessJudge;
