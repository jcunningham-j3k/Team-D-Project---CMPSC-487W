// lib/widgets/usage_reasons_chart.dart
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'services/firebase_service.dart';

class UsageReasonsChart extends StatelessWidget {
  UsageReasonsChart({Key? key}) : super(key: key);

  // We'll now create a larger color list to handle more dynamic categories
  final List<Color> chartColors = [
    Colors.blue,
    Colors.deepPurple,
    Colors.pinkAccent,
    Colors.lightBlue,
    Colors.amber,
    Colors.teal,
    Colors.green,
    Colors.orange,
    Colors.red,
    Colors.indigo,
  ];

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
        
        // Check if there's any data to display
        if (stats.usageReasons.isEmpty || 
            stats.usageReasons.values.fold(0, (sum, count) => sum + count) == 0) {
          return const Card(
            elevation: 3,
            child: SizedBox(
              height: 300,
              child: Center(child: Text('No usage data available')),
            ),
          );
        }
        
        final usageData = _prepareChartData(stats.usageReasons);
        
        return Card(
          elevation: 3,
          child: Padding(
            padding: const EdgeInsets.all(12.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Usage Reasons",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 12),
                SizedBox(
                  height: 300,
                  child: PieChart(
                    PieChartData(
                      sectionsSpace: 2,
                      centerSpaceRadius: 40,
                      sections: usageData.asMap().entries.map((entry) {
                        int index = entry.key;
                        _UsageData data = entry.value;
                        return PieChartSectionData(
                          value: data.value.toDouble(),
                          color: data.color,
                          title: "${data.name}\n${data.value}%",
                          radius: 60,
                          titleStyle: const TextStyle(fontSize: 12, color: Colors.white),
                        );
                      }).toList(),
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                // Simple legend with Wrap for better responsiveness
                Wrap(
                  spacing: 12,
                  runSpacing: 8,
                  children: usageData.map((data) {
                    return Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 12,
                          height: 12,
                          color: data.color,
                        ),
                        const SizedBox(width: 4),
                        Text(data.name, style: const TextStyle(fontSize: 12)),
                      ],
                    );
                  }).toList(),
                )
              ],
            ),
          ),
        );
      }
    );
  }
  
  List<_UsageData> _prepareChartData(Map<String, int> usageReasons) {
    // Calculate total
    int total = usageReasons.values.fold(0, (sum, count) => sum + count);
    
    // Convert to percentages
    List<_UsageData> result = [];
    int index = 0;
    
    // Sort by count descending to make chart more readable
    var sortedEntries = usageReasons.entries.toList()
      ..sort((a, b) => b.value.compareTo(a.value));
    
    for (var entry in sortedEntries) {
      int percentage = total > 0 ? ((entry.value / total) * 100).round() : 0;
      if (percentage > 0) {
        result.add(_UsageData(
          name: entry.key,
          value: percentage,
          color: chartColors[index % chartColors.length],
        ));
        index++;
      }
    }
    
    return result;
  }
}

class _UsageData {
  final String name;
  final int value;
  final Color color;
  _UsageData({required this.name, required this.value, required this.color});
}