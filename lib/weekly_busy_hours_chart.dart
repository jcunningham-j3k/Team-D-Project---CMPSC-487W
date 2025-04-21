// lib/widgets/weekly_busy_hours_chart.dart
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'services/firebase_service.dart';

class WeeklyBusyHoursChart extends StatelessWidget {
  WeeklyBusyHoursChart({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final FirebaseService firebaseService = FirebaseService();
    
    return FutureBuilder<UsageStatistics>(
      future: firebaseService.getUsageStatistics(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Card(
            elevation: 3,
            child: SizedBox(
              height: 300,
              child: Center(child: CircularProgressIndicator()),
            ),
          );
        }
        
        if (snapshot.hasError) {
          return Card(
            elevation: 3,
            child: SizedBox(
              height: 300,
              child: Center(child: Text('Error: ${snapshot.error}')),
            ),
          );
        }
        
        final stats = snapshot.data!;
        final weeklyData = _prepareChartData(stats.weeklyBusyHours);
        
        // Find max value for chart scaling
        int maxHours = weeklyData.map((data) => data.hours).reduce((a, b) => a > b ? a : b);
        
        return Card(
          elevation: 3,
          child: Padding(
            padding: const EdgeInsets.all(12.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Weekly Busy Hours",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 12),
                SizedBox(
                  height: 300,
                  child: BarChart(
                    BarChartData(
                      maxY: (maxHours * 1.2).ceilToDouble(), // Add 20% margin
                      barTouchData: BarTouchData(enabled: true),
                      titlesData: FlTitlesData(
                        bottomTitles: AxisTitles(
                          sideTitles: SideTitles(
                            showTitles: true,
                            getTitlesWidget: (value, meta) {
                              final index = value.toInt();
                              if (index >= 0 && index < weeklyData.length) {
                                return Text(weeklyData[index].day, style: const TextStyle(fontSize: 12));
                              }
                              return const Text('');
                            },
                          ),
                        ),
                        leftTitles: AxisTitles(
                          sideTitles: SideTitles(showTitles: true, reservedSize: 28),
                        ),
                      ),
                      barGroups: weeklyData.asMap().entries.map((entry) {
                        int index = entry.key;
                        _WeeklyData data = entry.value;
                        return BarChartGroupData(
                          x: index,
                          barRods: [
                            BarChartRodData(
                              toY: data.hours.toDouble(),
                              color: Colors.blueAccent,
                              width: 16,
                              borderRadius: const BorderRadius.only(
                                topLeft: Radius.circular(4),
                                topRight: Radius.circular(4),
                              ),
                            ),
                          ],
                        );
                      }).toList(),
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      }
    );
  }
  
  List<_WeeklyData> _prepareChartData(Map<String, int> weeklyHours) {
    // Define order of days
    final orderedDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Create ordered list based on our predefined order
    List<_WeeklyData> result = [];
    for (String day in orderedDays) {
      result.add(_WeeklyData(
        day: day,
        hours: weeklyHours[day] ?? 0,
      ));
    }
    
    return result;
  }
}

class _WeeklyData {
  final String day;
  final int hours;
  _WeeklyData({required this.day, required this.hours});
}