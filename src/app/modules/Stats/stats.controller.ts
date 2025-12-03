import CatchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { StatsService } from './stats.service';

const getDashboardStats = CatchAsync(async (req, res) => {
    const result = await StatsService.getDashboardStatsFromDB();

    SendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Dashboard stats retrieved successfully',
        data: result,
    });
});

export const StatsController = {
    getDashboardStats,
};
