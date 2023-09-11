import mockData from '@/../../tests/unit/mockData';

export const getOverviewDate = jest.fn().mockResolvedValue(mockData.OVDATE);

export const getOverview = jest.fn().mockRejectedValue(mockData.diaryOverview);
