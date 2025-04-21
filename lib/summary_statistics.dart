// lib/widgets/summary_statistics.dart
import 'package:flutter/material.dart';
import 'services/firebase_service.dart';

class StatCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final String? description;

  const StatCard({
    Key? key,
    required this.title,
    required this.value,
    required this.icon,
    this.description,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 3,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: Colors.blue.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: Colors.blue),
            ),
            const SizedBox(width: 20),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 14,
                    color: Colors.grey,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  value,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                if (description != null)
                  Padding(
                    padding: const EdgeInsets.only(top: 4.0),
                    child: Text(
                      description!,
                      style: const TextStyle(fontSize: 12, color: Colors.grey),
                    ),
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class SummaryStatistics extends StatelessWidget {
  const SummaryStatistics({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final FirebaseService firebaseService = FirebaseService();
    
    return FutureBuilder<UsageStatistics>(
      future: firebaseService.getUsageStatistics(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        
        if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        }
        
        final stats = snapshot.data!;
        
        return LayoutBuilder(
          builder: (context, constraints) {
            double cardWidth = constraints.maxWidth > 600 
                ? (constraints.maxWidth - 24) / 3  // On wider screens show 3 cards in a row
                : constraints.maxWidth > 400 
                  ? (constraints.maxWidth - 12) / 2  // On medium screens show 2 cards in a row
                  : constraints.maxWidth;  // On small screens stack cards vertically
            
            return Wrap(
              spacing: 12,
              runSpacing: 12,
              children: [
                SizedBox(
                  width: cardWidth,
                  child: StatCard(
                    title: "Total Hours",
                    value: stats.totalHours.toString(),
                    icon: Icons.access_time,
                    description: "Cumulative space usage",
                  ),
                ),
                SizedBox(
                  width: cardWidth,
                  child: StatCard(
                    title: "Unique Users",
                    value: stats.uniqueUsers.toString(),
                    icon: Icons.group,
                    description: "Individual students",
                  ),
                ),
                SizedBox(
                  width: cardWidth,
                  child: StatCard(
                    title: "Avg. Visit Duration",
                    value: "${stats.avgVisitDuration.toStringAsFixed(1)} hrs",
                    icon: Icons.calendar_today,
                    description: "Per student visit",
                  ),
                ),
              ],
            );
          }
        );
      },
    );
  }
}