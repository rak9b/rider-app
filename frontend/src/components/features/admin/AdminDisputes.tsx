import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { MessageSquare, MoreHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';

interface Dispute {
  id: string;
  user: string;
  role: 'Rider' | 'Driver';
  issue: string;
  date: string;
  status: 'open' | 'resolved' | 'investigating';
  severity: 'high' | 'medium' | 'low';
}

const INITIAL_DISPUTES: Dispute[] = [
  {
    id: 'DISP-9001',
    user: 'John Rider',
    role: 'Rider',
    issue: 'Overcharged for detour',
    date: '2026-07-25',
    status: 'open',
    severity: 'high',
  },
  {
    id: 'DISP-9002',
    user: 'Mike Driver',
    role: 'Driver',
    issue: 'Unresponsive passenger at pickup',
    date: '2026-07-24',
    status: 'investigating',
    severity: 'medium',
  },
  {
    id: 'DISP-9003',
    user: 'Sarah Rider',
    role: 'Rider',
    issue: 'Left personal item in vehicle',
    date: '2026-07-23',
    status: 'resolved',
    severity: 'low',
  },
];

export const AdminDisputes = () => {
  const [disputes] = useState<Dispute[]>(INITIAL_DISPUTES);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dispute Resolution</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage and resolve reported issues.</p>
        </div>
        <Button variant="outline" onClick={() => toast.success('Exporting dispute report...')}>Export Report</Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-slate-800 text-xs uppercase text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">Ticket ID</th>
                <th className="px-6 py-4">Reported By</th>
                <th className="px-6 py-4">Issue Type</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {disputes.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">#{item.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{item.user}</div>
                    <div className="text-xs text-gray-500">{item.role}</div>
                  </td>
                  <td className="px-6 py-4">{item.issue}</td>
                  <td className="px-6 py-4">
                    <Badge variant={item.severity === 'high' ? 'danger' : item.severity === 'medium' ? 'warning' : 'default'}>
                      {item.severity}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        item.status === 'open' ? 'bg-red-500' : 
                        item.status === 'investigating' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <span className="capitalize">{item.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => toast.info(`Opening chat for ${item.id}`)}>
                        <MessageSquare size={16} />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => toast.info(`Options for ${item.id}`)}>
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
